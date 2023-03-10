import { RenderAligningShiftedBox } from "../../renderobject"
import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject"
import { Size, Alignment, TextDirection } from "../../type"
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget"
import type Widget from "../../widget/Widget"

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

  override updateRenderObject(renderObject: RenderAlign) {
    renderObject.alignment = this.alignment
    renderObject.widthFactor = this.width
    renderObject.heightFactor = this.height
  }
}

class RenderAlign extends RenderAligningShiftedBox {
  widthFactor: number
  heightFactor: number
  constructor({
    alignment,
    width,
    height,
  }: {
    alignment: Alignment
    width: number
    height: number
  }) {
    super({ alignment, textDirection: TextDirection.ltr })
    this.widthFactor = width
    this.heightFactor = height
  }

  protected preformLayout(): void {
    this.size = this.constraints.constrain(
      new Size({ width: this.widthFactor, height: this.heightFactor })
    )

    if (this.child == null) return

    this.child.layout(this.constraints.loosen())

    if (this.constraints.isUnbounded) {
      this.size = this.child.size
    }

    this.alignChild()
  }
}

export default Align
