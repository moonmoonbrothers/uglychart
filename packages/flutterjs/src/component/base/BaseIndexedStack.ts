import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject";
import { assert } from "../../utils";
import MultiChildRenderObjectWidget from "../../widget/MultiChildRenderObjectWidget";
import Stack, { RenderStack, type StackFit } from "./BaseStack";
import type Widget from "../../widget/Widget";
import { Alignment } from "../../type";

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
}

export default IndexedStack;
