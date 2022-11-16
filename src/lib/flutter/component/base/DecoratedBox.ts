import SingleChildRenderObject from "$lib/flutter/renderobject/SingleChildRenderObject"
import Size from "$lib/flutter/utils/size"
import type { PaintContext } from "$lib/flutter/utils/type"
import SingleChildRenderObjectWidget from "$lib/flutter/widget/SingleChildRenderObjectWidget"
import type Widget from "$lib/flutter/widget/Widget"

export type Decoration = {
  color?: string
  border?: {
    color?: string
  }
}

class DecoratedBox extends SingleChildRenderObjectWidget {
  decoration: Required<Decoration>
  constructor({
    decoraiton: {
      color = "transparent",
      border: { color: borderColor = "black" } = {},
    },
    child,
  }: {
    decoraiton: Decoration
    child?: Widget
  }) {
    super({ child })
    this.decoration = {
      color,
      border: {
        color: borderColor,
      },
    }
  }

  override createRenderObject(): RenderDocoratedBox {
    return new RenderDocoratedBox(this.decoration)
  }
}

class RenderDocoratedBox extends SingleChildRenderObject {
  decoration: Required<Decoration>
  constructor(decoration: Required<Decoration>) {
    super()
    this.decoration = decoration
  }

  protected override preformLayout(): void {
    let size = Size.zero()
    if (this.child != null) {
      this.child.layout(this.constraint)
      size = this.child.size
    }
    this.size = this.constraint.constrain(size)
  }

  protected override performPaint({ ctx }: PaintContext): void {
    const { color } = this.decoration
    if (color != null) ctx.fillStyle = color
    ctx.fillRect(0, 0, this.size.width, this.size.height)
  }
}

export default DecoratedBox
