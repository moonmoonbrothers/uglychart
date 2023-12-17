import { SingleChildRenderObject } from "../../renderobject";
import RenderObjectVisitor from "../../renderobject/RenderObjectVisitor";
import { SingleChildRenderObjectWidget, Widget } from "../../widget";

export default class BaseZIndex extends SingleChildRenderObjectWidget {
  zIndex: number;
  constructor({
    key,
    child,
    zIndex,
  }: {
    key?: any;
    child?: Widget;
    zIndex: number;
  }) {
    super({ key, child });

    this.zIndex = zIndex;
  }

  createRenderObject(): SingleChildRenderObject {
    return new RenderZIndex({ zIndex: this.zIndex });
  }

  updateRenderObject(renderObject: RenderZIndex): void {
    renderObject.zIndex = this.zIndex;
  }
}

export class RenderZIndex extends SingleChildRenderObject {
  #zIndex: number;
  get zIndex() {
    return this.#zIndex;
  }
  set zIndex(value: number) {
    if (this.#zIndex === value) return;
    this.#zIndex = value;
    this.markNeedsPaint();
    this.didChangeDomOrder();
  }
  constructor({ zIndex }: { zIndex: number }) {
    super({ isPainter: false });
    this.#zIndex = zIndex;
  }

  override accept(visitor: RenderObjectVisitor): void {
    visitor.visitZIndex(this);
  }
}
