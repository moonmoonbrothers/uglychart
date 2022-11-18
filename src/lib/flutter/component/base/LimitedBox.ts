import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject"
import Size from "../../utils/size"
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget"
import type Widget from "../../widget/Widget"

export type LimitedBoxProps = {
  width?: number
  height?: number
  child?: Widget
}

class LimitedBox extends SingleChildRenderObjectWidget {
  width: number
  height: number
  constructor({ width = 0, height = 0, child }: LimitedBoxProps) {
    super({ child })
    this.width = width
    this.height = height
  }

  createRenderObject(): SingleChildRenderObject {
    return new RenderLimitedBox({
      width: this.width,
      height: this.height,
    })
  }
}

class RenderLimitedBox extends SingleChildRenderObject {
  private width: number
  private height: number
  constructor({ width, height }: { width: number; height: number }) {
    super()
    this.width = width
    this.height = height
  }

  protected preformLayout(): void {
    const constraint = this.constraint
    const size = constraint.constrain(
      new Size({ width: this.width, height: this.height })
    )
    const child = this.child
    if (child != null) {
      child.layout(constraint)
      const childSize = child.size
      this.size = new Size({
        width: Math.max(size.width, childSize.width),
        height: Math.max(size.height, childSize.height),
      })
    } else {
      this.size = size
    }
  }

  override getIntrinsicHeight(): number {
    const childInstrinsicHeight = this.child?.getIntrinsicHeight() || 0
    return this.height === Infinity
      ? childInstrinsicHeight
      : Math.max(this.height, childInstrinsicHeight)
  }

  override getIntrinsicWidth(): number {
    const childInstrinsicWidth = this.child?.getIntrinsicWidth() || 0
    return this.width === Infinity
      ? childInstrinsicWidth
      : Math.max(this.width, childInstrinsicWidth)
  }
}

export default LimitedBox
