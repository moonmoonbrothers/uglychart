import RenderAligningShiftedBox from "../../renderobject/RenderAligningShiftedBox"
import RenderObject from "../../renderobject/RenderObject"
import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject"
import { Alignment, Constraints, Offset, TextDirection } from "../../type"
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

  override createRenderObject(): SingleChildRenderObject {}

  updateRenderObject(renderObject: RenderObject): void {}
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
