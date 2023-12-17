import { Size, Offset, Constraints, Matrix4 } from "../type";
import type { PaintContext } from "../utils/type";
import ShortUniqueId from "short-unique-id";
import { RenderObjectElement } from "../element";
import { RenderOwner } from "../scheduler";
import { assert } from "../utils";

/*
  It does more things than flutters' RenderObject 
  Actually, It is more like RenderShiftedBox
*/
class RenderObject {
  readonly isPainter: boolean;
  ownerElement!: RenderObjectElement;
  renderOwner!: RenderOwner;
  parent?: RenderObject;
  needsPaint = true;
  needsLayout = true;
  private clipId?: string;
  private matrix: Matrix4 = Matrix4.identity();
  opacity = 0;
  depth = 0;

  #domNode!: SVGElement;
  /**
   * domOrder is used to rearrange dom order
   * it will be set by RenderOwner before flushPaint
   */
  #domOrder!: number;
  get domOrder() {
    assert(this.#domOrder != null, "domOrder is not initialized");
    return this.#domOrder;
  }
  set domOrder(newOrder: number) {
    if (newOrder === this.#domOrder) return;
    this.#domOrderChanged = true;
    this.#domOrder = newOrder;
  }
  #domOrderChanged = false;
  get domNode() {
    assert(this.#domNode != null, "domNode is not initialized");
    return this.#domNode;
  }
  protected set domNode(el: SVGElement) {
    this.#domNode = el;
  }
  constructor({ isPainter }: { isPainter: boolean }) {
    this.isPainter = isPainter;
  }
  type = this.constructor.name;
  get children(): RenderObject[] {
    return this.ownerElement.children.map((child) => child.renderObject);
  }
  constraints: Constraints = Constraints.loose(Size.maximum());
  private _offset: Offset = Offset.zero();
  get offset() {
    return this._offset;
  }
  set offset(value: Offset) {
    if (this.offset.x === value.x && this.offset.y === value.y) return;
    this._offset = value;
  }
  private _size: Size = Size.zero;
  get size() {
    return this._size;
  }
  set size(value) {
    if (this.size.height === value.height && this.size.width === value.width) {
      return;
    }
    this._size = value;
  }
  parentUsesSize = false;

  layout(
    constraint: Constraints,
    { parentUsesSize = true }: { parentUsesSize?: boolean } = {}
  ) {
    const normalizedConstraints = constraint.normalize();
    if (this.constraints.equals(normalizedConstraints) && !this.needsLayout) {
      return;
    }
    this.constraints = normalizedConstraints;
    this.parentUsesSize = parentUsesSize;
    this.preformLayout();
    this.needsLayout = false;
    this.markNeedsPaint();
  }

  paint(
    context: PaintContext,
    clipId?: string,
    matrix4: Matrix4 = Matrix4.identity(),
    opacity: number = 1
  ) {
    if (
      this.clipId === clipId &&
      this.matrix.equals(matrix4) &&
      this.opacity === opacity &&
      !this.needsPaint
    ) {
      return;
    }
    this.matrix = matrix4;
    this.clipId = clipId;
    this.opacity = opacity;
    const translatedMatrix4 = matrix4.translated(this.offset.x, this.offset.y);
    if (this.isPainter) {
      const { svgEls, container } = this.resolveSvgEl();
      if (clipId) {
        container.setAttribute("clip-path", `url(#${clipId})`);
      }
      container.setAttribute("opacity", `${opacity}`);
      container.setAttribute("pointer-events", "none");
      Object.values(svgEls).forEach((el) =>
        this.setSvgTransform(el, translatedMatrix4)
      );
      this.performPaint(svgEls, context);
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

  private paintChildren(
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

  protected getChildMatrix4(parentMatrix: Matrix4): Matrix4 {
    return parentMatrix;
  }

  protected getChildOpacity(parentOpacity: number): number {
    return parentOpacity;
  }

  private setSvgTransform(el: SVGElement, matrix: Matrix4) {
    el.style.transform = `matrix3d(${matrix.storage.join(",")})`;
  }

  attach(ownerElement: RenderObjectElement) {
    this.ownerElement = ownerElement;
    this.depth = ownerElement.depth;
    if (this.isPainter) {
      this.mountSvgEl(this.renderOwner.paintContext);
      this.renderOwner.didDomOrderChange();
    }
  }

  dispose(context: PaintContext) {
    if (this.isPainter) {
      this.#domNode.remove();
      this.renderOwner.didDomOrderChange();
    }
  }

  getIntrinsicWidth(height: number) {
    return 0;
  }

  getIntrinsicHeight(width: number) {
    return 0;
  }

  mountSvgEl(context: PaintContext) {
    const { appendSvgEl } = context;

    const svgEls = this.createDefaultSvgEl(context);
    Object.entries(svgEls).forEach(([name, value]) => {
      value.setAttribute("data-render-name", name);
    });
    const values = Object.values(svgEls);
    const svgG = context.createSvgEl("g");
    appendSvgEl(svgG);
    svgG.setAttribute("data-render-type", this.type);
    values.forEach((value) => {
      svgG.appendChild(value);
    });

    this.#domNode = svgG;
  }

  protected resolveSvgEl(): {
    svgEls: Record<string, SVGElement>;
    container: SVGElement;
  } {
    const container = this.domNode;
    const svgEls: Record<string, SVGElement> = {};
    for (let i = 0; i < container.children.length; i++) {
      const child = container.children[i];
      const name = child.getAttribute("data-render-name")!;
      svgEls[name] = child as unknown as SVGElement;
    }

    return { svgEls, container };
  }

  rearrangeDomOrder() {
    if (!this.#domOrderChanged) return;

    this.renderOwner.paintContext.insertSvgEl(this.domNode, this.domOrder);
    this.#domOrderChanged = false;
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
  }

  paintWithoutLayout(context: PaintContext) {
    this.paint(context, this.clipId, this.matrix, this.opacity);
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

  localToGlobal(additionalOffset: Offset = Offset.zero()) {
    return new Offset({
      x: this.matrix.storage[12] + this.offset.x + additionalOffset.x,
      y: this.matrix.storage[13] + this.offset.y + additionalOffset.y,
    });
  }
}

export default RenderObject;
