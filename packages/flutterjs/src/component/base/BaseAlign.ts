import { RenderAligningShiftedBox } from "../../renderobject"
import { Size, Alignment, TextDirection } from "../../type"
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget"
import type Widget from "../../widget/Widget"

class Align extends SingleChildRenderObjectWidget {
  widthFactor?: number
  heightFactor?: number
  alignment: Alignment
  constructor({
    child,
    widthFactor,
    heightFactor,
    alignment = Alignment.center,
  }: {
    child?: Widget
    alignment?: Alignment
    widthFactor?: number
    heightFactor?: number
  }) {
    super({ child })
    this.alignment = alignment
    this.widthFactor = widthFactor
    this.heightFactor = heightFactor
  }

  override createRenderObject(): RenderAlign {
    return new RenderAlign({
      alignment: this.alignment,
      widthFactor: this.widthFactor,
      heightFactor: this.heightFactor,
    })
  }

  override updateRenderObject(renderObject: RenderAlign) {
    renderObject.alignment = this.alignment
    renderObject.widthFactor = this.widthFactor
    renderObject.heightFactor = this.heightFactor
  }
}

class RenderAlign extends RenderAligningShiftedBox {
  widthFactor?: number
  heightFactor?: number
  constructor({
    alignment,
    widthFactor,
    heightFactor,
  }: {
    alignment: Alignment
    widthFactor?: number
    heightFactor?: number
  }) {
    super({ alignment, textDirection: TextDirection.ltr })

    if (widthFactor != null && widthFactor < 0)
      throw new Error("widthFactor must be greater than zero")
    if (heightFactor != null && heightFactor < 0)
      throw new Error("heightFactor must be greater than zero")

    this.widthFactor = widthFactor
    this.heightFactor = heightFactor
  }

  protected preformLayout(): void {
    const constraints = this.constraints
    const shrinkWrapWidth =
      this.widthFactor != null || constraints.maxWidth == Infinity
    const shrinkWrapHeight =
      this.heightFactor != null || constraints.maxHeight == Infinity

    if (this.child != null) {
      this.child.layout(constraints.loosen())
      this.size = constraints.constrain(
        new Size({
          width: shrinkWrapWidth
            ? this.child.size.width * (this.widthFactor ?? 1)
            : Infinity,
          height: shrinkWrapHeight
            ? this.child.size.height * (this.heightFactor ?? 1)
            : Infinity,
        })
      )
      this.alignChild()
    } else {
      this.size = constraints.constrain(
        new Size({
          width: shrinkWrapWidth ? 0 : Infinity,
          height: shrinkWrapHeight ? 0 : Infinity,
        })
      )
    }
  }
}

export default Align
