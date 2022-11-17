import SingleChildRenderObject from "$lib/flutter/renderobject/SingleChildRenderObject"
import Alignment from "$lib/flutter/utils/alignment"
import Size from "$lib/flutter/utils/size"
import SingleChildRenderObjectWidget from "$lib/flutter/widget/SingleChildRenderObjectWidget"
import type Widget from "$lib/flutter/widget/Widget"

class Align extends SingleChildRenderObjectWidget {
  width: number
  height: number
  alignment: Alignment
  constructor({
    child,
    width = Infinity,
    height = Infinity,
    alignment = Alignment.topLeft,
  }: {
    child?: Widget
    alignment?: Alignment
    width?: number
    height?: number
  }) {
    super({ child })
    this.alignment = alignment
    this.width = width
    this.height = height
  }

  override createRenderObject(): RenderAlign {
    return new RenderAlign({
      alignment: this.alignment,
      width: this.width,
      height: this.height,
    })
  }
}

class RenderAlign extends SingleChildRenderObject {
  alignment: Alignment
  width: number
  height: number
  constructor({
    alignment,
    width,
    height,
  }: {
    alignment: Alignment

    width: number
    height: number
  }) {
    super()
    this.alignment = alignment
    this.width = width
    this.height = height
  }

  protected preformLayout(): void {
    this.size = this.constraint.constrain(
      new Size({ width: this.width, height: this.height })
    )

    if (this.child == null) return

    this.child.layout(this.constraint)

    if (this.constraint.isUnbounded) {
      this.size = this.child.size
    }

    this.child.offset = this.alignment.getOffset({
      target: this.child.size,
      current: this.size,
    })
  }
}

export default Align
