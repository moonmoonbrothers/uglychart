import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject"
import { Size, Constraint } from "$lib/flutter/type"
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget"
import type Widget from "../../widget/Widget"

/*
  this widget must be renamed to SizedBox
*/

export type LimitedBoxProps = {
  width?: number
  height?: number
  child?: Widget
  stretchable?: boolean
}

class LimitedBox extends SingleChildRenderObjectWidget {
  width: number
  height: number
  stretchable: boolean // can be resized by child
  constructor({
    width = 0,
    height = 0,
    child,
    stretchable = true,
  }: LimitedBoxProps) {
    super({ child })
    this.width = width
    this.height = height
    this.stretchable = stretchable
  }

  createRenderObject(): SingleChildRenderObject {
    return new RenderLimitedBox({
      width: this.width,
      height: this.height,
      stretchable: this.stretchable,
    })
  }

  updateRenderObject(renderObject: RenderLimitedBox): void {
    renderObject.width = this.width
    renderObject.height = this.height
    renderObject.stretchable = this.stretchable
  }
}

class RenderLimitedBox extends SingleChildRenderObject {
  width: number
  height: number
  stretchable: boolean // can be resized by child
  constructor({
    width,
    height,
    stretchable,
  }: {
    width: number
    height: number
    stretchable: boolean
  }) {
    super()
    this.width = width
    this.height = height
    this.stretchable = stretchable
  }

  protected preformLayout(): void {
    const constraint = this.constraint
    const size = constraint.constrain(
      new Size({ width: this.width, height: this.height })
    )
    const child = this.child
    if (child != null) {
      this.stretchable
        ? child.layout(constraint)
        : child.layout(
            Constraint.loose({
              width: this.width,
              height: this.height,
            })
          )
      const childSize = child.size
      this.size = new Size({
        width: this.stretchable
          ? Math.max(size.width, childSize.width)
          : this.width,
        height: this.stretchable
          ? Math.max(size.height, childSize.height)
          : this.height,
      })
    } else {
      this.size = size
    }
  }

  override getIntrinsicHeight(): number {
    const childInstrinsicHeight = this.child?.getIntrinsicHeight() || 0
    const height =
      this.height === Infinity
        ? childInstrinsicHeight
        : Math.max(this.height, childInstrinsicHeight)

    return this.stretchable ? height : this.height
  }

  override getIntrinsicWidth(): number {
    const childInstrinsicWidth = this.child?.getIntrinsicWidth() || 0
    const width =
      this.width === Infinity
        ? childInstrinsicWidth
        : Math.max(this.width, childInstrinsicWidth)
    return this.stretchable ? width : this.width
  }
}

export default LimitedBox
