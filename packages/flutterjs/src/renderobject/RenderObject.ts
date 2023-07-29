import { Size, Offset, Constraints, Matrix4 } from "../type";
import type { PaintContext } from "../utils/type";
import ShortUniqueId from "short-unique-id";
import { RenderObjectElement } from "../element";
import { RenderOwner } from "../scheduler";
import { assert } from "../utils";

const uid = new ShortUniqueId({ dictionary: "hex" });

/*
  It does more things than flutters' RenderObject 
  Actually, It is more like RenderShiftedBox
*/
class RenderObject {
  isPainter: boolean;
  id = uid.randomUUID(6);
  ownerElement!: RenderObjectElement;
  renderOwner!: RenderOwner;
  parent?: RenderObject;
  needsPaint = true;
  needsLayout = true;
  clipId?: string;
  matrix: Matrix4 = Matrix4.identity();
  opacity = 0;
  depth = 0;
  constructor({ isPainter }: { isPainter: boolean }) {
    this.isPainter = isPainter;
  }
  type = this.constructor.name;
  get children(): RenderObject[] {
    return this.ownerElement.children.map((child) => child.renderObject);
  }
  size: Size = Size.zero;
  constraints: Constraints = Constraints.loose(Size.maximum());
  offset: Offset = Offset.zero();
  parentUsesSize = false;

  layout(
    constraint: Constraints,
    { parentUsesSize = true }: { parentUsesSize?: boolean } = {}
  ) {
    const normalizedConstraints = constraint.normalize();
    if (this.constraints.equal(normalizedConstraints) && !this.needsLayout) {
      return;
    }
    this.constraints = normalizedConstraints;
    this.parentUsesSize = parentUsesSize;
    this.preformLayout();
    this.needsLayout = false;
  }

  paint(
    context: PaintContext,
    clipId?: string,
    matrix4: Matrix4 = Matrix4.identity(),
    opacity: number = 1
  ) {
    if (
      this.clipId === clipId &&
      this.matrix === matrix4 &&
      this.opacity === opacity &&
      !this.needsPaint
    ) {
      return;
    }
    this.clipId = clipId;
    this.matrix = matrix4;
    this.opacity = opacity;
    const translatedMatrix4 = matrix4.translated(this.offset.x, this.offset.y);
    if (this.isPainter) {
      const { svgEls, container } = this.findOrAppendSvgEl(context);
      if (clipId) {
        container.setAttribute("clip-path", `url(#${clipId})`);
      }
      container.setAttribute("opacity", `${opacity}`);
      container.setAttribute("pointer-events", "none");
      this.performPaint(svgEls, context);
      Object.values(svgEls).forEach((el) =>
        this.setSvgTransform(el, translatedMatrix4)
      );
    }
    this.needsPaint = false;
    const childClipId = this.getChildClipId(clipId);
    const childMatrix4 = this.getChildMatrix4(translatedMatrix4);
    const childOpacity = this.getChildOpacity(opacity);
    this.paintChildren(context, {
      clipId: childClipId,
      matrix4: childMatrix4,
      opacity: childOpacity,
    });
  }

  paintChildren(
    context: PaintContext,
    {
      clipId,
      matrix4,
      opacity,
    }: {
      clipId?: string;
      matrix4: Matrix4;
      opacity: number;
    }
  ) {
    this.children.forEach((child) =>
      child.paint(context, clipId, matrix4, opacity)
    );
  }

  getChildMatrix4(parentMatrix: Matrix4): Matrix4 {
    return parentMatrix;
  }

  getChildOpacity(parentOpacity: number): number {
    return parentOpacity;
  }

  setSvgTransform(el: SVGElement, matrix: Matrix4) {
    el.style.transform = `matrix3d(${matrix.storage.join(",")})`;
  }

  attach(ownerElement: RenderObjectElement) {
    this.ownerElement = ownerElement;
    this.depth = ownerElement.depth;
  }

  dispose(context: PaintContext) {
    if (this.isPainter) {
      context.findSvgEl(this.id)?.remove();
    }
    this.children.forEach((child) => child.dispose(context));
  }

  //It is like computeIntrinsicMinWidth on Flutter
  getIntrinsicWidth(height: number) {
    return 0;
  }

  //It is like computeIntrinsicMinHeight on Flutter
  getIntrinsicHeight(width: number) {
    return 0;
  }

  private findOrAppendSvgEl(context: PaintContext) {
    const { findSvgEl, appendSvgEl } = context;
    const oldEl = findSvgEl(this.id);
    let svgEls: { [key: string]: SVGElement } = {};
    let container: SVGElement;
    if (oldEl) {
      container = oldEl;
      if (oldEl.nodeName === "g") {
        for (let i = 0; i < oldEl.children.length; i++) {
          const child = oldEl.children[i];
          const name = child.getAttribute("data-render-name")!;
          svgEls[name] = child as unknown as SVGElement;
        }
      } else {
        /*
        This must be clip path element!
        */
        const name = oldEl.getAttribute("data-render-name")!;
        svgEls[name] = oldEl;
      }
    } else {
      svgEls = this.createDefaultSvgEl(context);
      Object.entries(svgEls).forEach(([name, value]) => {
        value.setAttribute("data-render-name", name);
      });
      const values = Object.values(svgEls);
      /*
       For absolute Clip coordinate, 
       svg element should be wrapped g tag and g tags must have only one attribute clip-path="url(...)" .
       If transform and clip-path are applied to same svg element, the clip-path is also transformed that is not expected in this library.
       So transform should be applied to g tag's children in order not to affect clip-path. 
       And ClipPath should not be wrapped g tag for multiple clip-path 
       if ClipPath is wrapped g tag, parent clip-path that is applied on g tag can not affect child clipPath element. 
       parent clipPath must be applied to clipPath element itself. 
       I don't know it is intended behavior in svg 2.0 specification.
      */
      if (values.length === 1 && values[0].nodeName === "CLIPPATH") {
        const svgEl = values[0];
        container = svgEl;
        context.setId(svgEl, this.id);
        svgEl.setAttribute("data-render-type", this.type);
        appendSvgEl(svgEl);
      } else {
        const svgG = context.createSvgEl("g");
        container = svgG;
        context.setId(svgG, this.id);
        appendSvgEl(svgG);
        svgG.setAttribute("data-render-type", this.type);
        values.forEach((value) => {
          svgG.appendChild(value);
        });
      }
    }
    return { svgEls, container };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected createDefaultSvgEl(paintContext: PaintContext): {
    [key: string]: SVGElement;
  } {
    throw { message: "not implemented defaultSvgEl" };
  }

  /*
   * Do not call this method directly. instead call layout
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected preformLayout(): void {
    throw { message: "not implemented performLayout" };
  }

  /*
   * Do not call this method directly. instead call paint
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  protected performPaint(
    svgEls: { [key: string]: SVGElement },
    context: PaintContext
  ): void {}

  protected getChildClipId(parentClipId?: string) {
    return parentClipId;
  }

  layoutWithoutResize() {
    this.layout(this.constraints, { parentUsesSize: this.parentUsesSize });
    this.markNeedsPaint();
  }

  markNeedsParentLayout() {
    this.parent?.markNeedsLayout();
  }

  markNeedsLayout() {
    this.needsLayout = true;
    if (this.parentUsesSize && this.parent != null) {
      this.markNeedsParentLayout();
    } else {
      this.renderOwner.needsLayoutRenderObjects.push(this);
      this.renderOwner.requestVisualUpdate();
    }
  }

  markNeedsPaint() {
    this.needsPaint = true;
    this.renderOwner.needsPaintRenderObjects.push(this);
  }
}

export default RenderObject;
