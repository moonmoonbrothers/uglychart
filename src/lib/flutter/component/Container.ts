import SingleChildRenderObject from "../renderobject/SingleChildRenderObject"
import type Constraint from "../utils/constraint"
import Size from "../utils/size"
import type { PaintContext } from "../utils/type"
import SingleChildRenderObjectWidget from "../widget/SingleChildRenderObjectWidget"
import type Widget from "../widget/Widget"

type Style = {
  border?: {
    color?: string
  }
  background?: {
    color?: string
  }
}

class Container extends SingleChildRenderObjectWidget {
  width: number
  height: number
  style?: Style
  constructor({
    width = 0,
    height = 0,
    child,
    style,
  }: {
    width?: number
    height?: number
    child?: Widget
    style?: Style
  }) {
    super({ child })
    this.width = width
    this.height = height
    this.style = style
  }

  createRenderObject(): SingleChildRenderObject {
    return new RenderContainer({
      width: this.width,
      height: this.height,
      style: this.style,
    })
  }
}

class RenderContainer extends SingleChildRenderObject {
  private width: number
  private height: number
  private style?: Style
  constructor({
    width,
    height,
    style,
  }: {
    width: number
    height: number
    style?: Style
  }) {
    super()
    this.width = width
    this.height = height
    this.style = style
  }

  protected preformLayout(constraint: Constraint): void {
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

  protected performPaint({ ctx }: PaintContext): void {
    if (this.style) {
      if (this.style.background) {
        const { color } = this.style.background
        if (color != null) ctx.fillStyle = color
      }
    }
    ctx.fillRect(0, 0, this.size.width, this.size.height)
  }
}

export default Container
