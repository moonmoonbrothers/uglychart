import { Size, Offset, Constraints, Matrix4 } from "../type";
import type { PaintContext } from "../utils/type";
import ShortUniqueId from "short-unique-id";
import { RenderObjectElement } from "../element";

const uid = new ShortUniqueId({ dictionary: "hex" });

/*
  It does more things than flutters' RenderObject 
  Actually, It is more like RenderShiftedBox
*/
class RenderObject {
  isPainter: boolean;
  id = uid.randomUUID(6);
  ownerElement!: RenderObjectElement;
  constructor({ isPainter }: { isPainter: boolean }) {
    this.isPainter = isPainter;
  }
  type = this.constructor.name;
  get children(): RenderObject[] {
    return this.ownerElement.children.map((child) => child.renderObject);
  }
  size: Size = Size.zero();
  constraints: Constraints = Constraints.loose(Size.maximum());
  offset: Offset = Offset.zero();

  layout(constraint: Constraints) {
    this.constraints = constraint.normalize();
    this.preformLayout();
  }

  paint(
    context: PaintContext,
    offset: Offset,
    clipId?: string,
    matrix4: Matrix4 = Matrix4.identity(),
    opacity: number = 1
  ) {
    const totalOffset = offset.plus(this.offset);
    if (this.isPainter) {
      // this line should be refactored.. It always return only one svgEl.
      const { svgEls, container } = this.findOrAppendSvgEl(context);
      if (clipId) {
        container.setAttribute("clip-path", `url(#${clipId})`);
      }
      container.setAttribute("opacity", `${opacity}`);
      this.performPaint(svgEls, totalOffset, matrix4);
    }
    const childClipId = this.getChildClipId(clipId);
    const childMatrix4 = this.getChildMatrix4(matrix4);
    const childOpacity = this.getChildOpacity(opacity);
    this.paintChildren(context, {
      offset: totalOffset,
      clipId: childClipId,
      matrix4: childMatrix4,
      opacity: childOpacity,
    });
  }

  paintChildren(
    context: PaintContext,
    {
      offset,
      clipId,
      matrix4,
      opacity,
    }: {
      offset: Offset;
      clipId?: string;
      matrix4: Matrix4;
      opacity: number;
    }
  ) {
    this.children.forEach((child) =>
      child.paint(context, offset, clipId, matrix4, opacity)
    );
  }

  getChildMatrix4(parentMatrix: Matrix4): Matrix4 {
    return parentMatrix;
  }

  getChildOpacity(parentOpacity: number): number {
    return parentOpacity;
  }

  setSvgTransform(el: SVGElement, offset: Offset, matrix: Matrix4) {
    const style = el.getAttribute("style") || "";
    el.setAttribute(
      "style",
      `${style} transform: translate(${offset.x}px, ${
        offset.y
      }px) matrix3d(${matrix.storage.join(",")});`
    );
    // el.setAttribute(
    //   "transform",
    //   `translate(${offset.x} ${offset.y}) matrix3d(${matrix.storage.join(
    //     " "
    //   )})`
    // );
  }

  attach(ownerElement: RenderObjectElement) {
    this.ownerElement = ownerElement;
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
        for (const child of oldEl.children) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const name = child.getAttribute("data-render-name")!;
          svgEls[name] = child as unknown as SVGElement;
        }
        /*
        This must be clip path element!
      */
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
    offset: Offset,
    matrix: Matrix4
  ): void {}

  protected getChildClipId(parentClipId?: string) {
    return parentClipId;
  }
}

export default RenderObject;
