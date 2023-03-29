import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject";
import { Size } from "../../type";
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget";
import type Widget from "../../widget/Widget";

class BasePositioned extends SingleChildRenderObjectWidget {
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
  width?: number;
  height?: number;
  constructor({
    top,
    bottom,
    left,
    right,
    width,
    height,
    child,
  }: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    width?: number;
    height?: number;
    child?: Widget;
  }) {
    super({ child });
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
    this.width = width;
    this.height = height;
  }

  createRenderObject(): RenderPositioned {
    return new RenderPositioned({
      top: this.top,
      left: this.left,
      right: this.right,
      bottom: this.bottom,
      width: this.width,
      height: this.height,
    });
  }

  updateRenderObject(renderObject: RenderPositioned): void {
    renderObject.top = this.top;
    renderObject.left = this.left;
    renderObject.bottom = this.bottom;
    renderObject.right = this.right;
    renderObject.width = this.width;
    renderObject.height = this.height;
  }
}

export class RenderPositioned extends SingleChildRenderObject {
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
  width?: number;
  height?: number;
  constructor({
    top,
    bottom,
    left,
    right,
    width,
    height,
  }: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    width?: number;
    height?: number;
  }) {
    super({ isPainter: false });
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
    this.width = width;
    this.height = height;
  }

  get isPositioned(): boolean {
    return (
      this.top != null ||
      this.bottom != null ||
      this.left != null ||
      this.right != null ||
      this.width != null ||
      this.height != null
    );
  }

  protected preformLayout(): void {
    let size = Size.zero();
    if (this.child) {
      this.child.layout(this.constraints);
      size = this.child.size;
    }
    this.size = this.constraints.constrain(size);
  }

  override getIntrinsicWidth(height: number): number {
    return this.child?.getIntrinsicWidth(height) || 0;
  }

  override getIntrinsicHeight(width: number): number {
    return this.child?.getIntrinsicHeight(width) || 0;
  }
}

export default BasePositioned;
