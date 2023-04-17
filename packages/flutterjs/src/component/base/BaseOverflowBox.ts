import RenderAligningShiftedBox from "../../renderobject/RenderAligningShiftedBox"
import { Alignment, Constraints,  TextDirection } from "../../type"
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget"
import Widget from "../../widget/Widget"

class BaseOverflowBox extends SingleChildRenderObjectWidget {
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
  alignment: Alignment
  constructor({
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    alignment = Alignment.center,
    child,
  }: {
    minWidth?: number
    maxWidth?: number
    minHeight?: number
    maxHeight?: number
    child?: Widget
    alignment?: Alignment
  }) {
    super({ child })
    this.maxHeight = maxHeight
    this.maxWidth = maxWidth
    this.minHeight = minHeight
    this.minWidth = minWidth
    this.alignment = alignment
  }

  override createRenderObject(): RenderOverflowBox {
    return new RenderOverflowBox({
      alignment: this.alignment,
      maxHeight: this.maxHeight,
      maxWidth: this.maxWidth,
      minHeight: this.minHeight,
      minWidth: this.minWidth,
    })
  }

  updateRenderObject(renderObject: RenderOverflowBox): void {
    renderObject.maxHeight = this.maxHeight
    renderObject.maxWidth = this.maxWidth
    renderObject.minHeight = this.minHeight
    renderObject.minWidth = this.minWidth
  }
}

class RenderOverflowBox extends RenderAligningShiftedBox {
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
  constructor({
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    alignment = Alignment.center,
  }: {
    minWidth?: number
    maxWidth?: number
    minHeight?: number
    maxHeight?: number
    alignment?: Alignment
  }) {
    super({ alignment, textDirection: TextDirection.ltr })
    this.maxHeight = maxHeight
    this.maxWidth = maxWidth
    this.minHeight = minHeight
    this.minWidth = minWidth
  }

  override preformLayout(): void {
    this.size = this.constraints.biggest

    if (this.child != null) {
      this.child.layout(this.getInnerConstraints(this.constraints))
      this.alignChild()
    }
  }

  private getInnerConstraints(constraints: Constraints): Constraints {
    return new Constraints({
      minHeight: this.minHeight ?? constraints.minHeight,
      maxHeight: this.maxHeight ?? constraints.maxHeight,
      minWidth: this.minWidth ?? constraints.minWidth,
      maxWidth: this.maxWidth ?? constraints.maxWidth,
    })
  }
}

export default BaseOverflowBox
