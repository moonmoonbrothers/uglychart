import { RenderAligningShiftedBox } from "../../renderobject"
import { Alignment, TextDirection } from "../../type"
import { SingleChildRenderObjectWidget, Widget } from "../../widget"

class BaseFractionallySizedBox extends SingleChildRenderObjectWidget {
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

  override createRenderObject(): RenderFractionallySizedBox {
    return new RenderFractionallySizedBox({
      alignment: this.alignment,
      widthFactor: this.widthFactor,
      heightFactor: this.heightFactor,
    })
  }

  override updateRenderObject(renderObject: RenderFractionallySizedBox) {
    renderObject.alignment = this.alignment
    renderObject.widthFactor = this.widthFactor
    renderObject.heightFactor = this.heightFactor
  }
}

class RenderFractionallySizedBox extends RenderAligningShiftedBox {
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

  protected preformLayout(): void {}
}

export default BaseFractionallySizedBox
