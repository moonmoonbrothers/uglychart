import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject";
import { assert } from "../../utils";
import MultiChildRenderObjectWidget from "../../widget/MultiChildRenderObjectWidget";
import Stack, { RenderStack, type StackFit } from "./BaseStack";
import type Widget from "../../widget/Widget";
import { Alignment, Matrix4, Offset } from "../../type";
import { PaintContext } from "../../utils/type";

class IndexedStack extends Stack {
  index: number;
  constructor({
    children,
    index = 0,
    sizing = "loose",
    alignment,
  }: {
    children: Widget[];
    sizing?: StackFit;
    alignment?: Alignment;
    index?: number;
  }) {
    super({ children, fit: sizing, alignment });
    this.index = index;
  }
  createRenderObject(): RenderIndexedStack {
    return new RenderIndexedStack({
      index: this.index,
      fit: this.fit,
      alignment: this.alignment,
    });
  }

  updateRenderObject(renderObject: RenderIndexedStack): void {
    renderObject.index = renderObject.index;
    renderObject.fit = this.fit;
    renderObject.alignment = this.alignment;
  }
}

class RenderIndexedStack extends RenderStack {
  index: number;
  constructor({
    index,
    fit,
    alignment,
  }: {
    fit: StackFit;
    alignment: Alignment;
    index: number;
  }) {
    super({ alignment, fit });
    this.index = index;
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
      clipId?: string | undefined;
      matrix4: Matrix4;
      opacity: number;
    }
  ): void {
    this.children.forEach((child) => child.dispose(context));
    const child = this.children[this.index];
    assert(child != null);
    child.paint(context, offset, clipId, matrix4, opacity);
  }
}

export default IndexedStack;
