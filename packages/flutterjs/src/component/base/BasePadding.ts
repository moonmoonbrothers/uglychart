import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject";
import { Size, Offset, EdgeInsets, Constraints } from "../../type";
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget";
import type Widget from "../../widget/Widget";

export default class Padding extends SingleChildRenderObjectWidget {
  padding: EdgeInsets;
  constructor({
    padding = EdgeInsets.all(0),
    child,
  }: {
    padding?: EdgeInsets;
    child?: Widget;
  }) {
    super({ child });
    this.padding = padding;
  }

  createRenderObject(): RenderPadding {
    return new RenderPadding({
      padding: this.padding,
    });
  }

  updateRenderObject(renderObject: RenderPadding): void {
    renderObject.padding = this.padding;
  }
}

class RenderPadding extends SingleChildRenderObject {
  padding: EdgeInsets;
  constructor({ padding }: { padding: EdgeInsets }) {
    super({ isPainter: false });
    this.padding = padding;
  }

  protected preformLayout(): void {
    if (this.child == null) return;
    const { top, left, right, bottom } = this.padding;
    const childConstraints = this.constraints.deflate(this.padding);

    this.child.layout(childConstraints);
    const { size: childSize } = this.child;

    this.size = this.constraints.constrain(
      new Size({
        width: childSize.width + left + right,
        height: childSize.height + top + bottom,
      })
    );

    this.child.offset = new Offset({ x: left, y: top });
  }

  getIntrinsicWidth(height: number): number {
    return super.getIntrinsicWidth(height) + this.padding.horizontal;
  }

  getIntrinsicHeight(width: number): number {
    return super.getIntrinsicHeight(width) + this.padding.vertical;
  }
}
