import { Alignment, Offset, TextDirection } from "../type"
import SingleChildRenderObject from "./SingleChildRenderObject"

class RenderAligningShiftedBox extends SingleChildRenderObject {
  alignment: Alignment
  textDirection: TextDirection
  constructor({
    alignment = Alignment.center,
    textDirection,
  }: {
    alignment?: Alignment
    textDirection: TextDirection
  }) {
    super({
      isPainter: false,
    })
    this.alignment = alignment
    this.textDirection = textDirection
  }

  private get resolvedAlignment(): Alignment | undefined {
    return this.alignment.resolve(this.textDirection)
  }

  alignChild() {
    if (this.child == null) throw Error("child must not be null")
    if (this.resolvedAlignment == null)
      throw Error("resolved alignment must not be null")
    this.child.offset = this.resolvedAlignment.alongOffset(
      Offset.raw({
        x: this.size.width - this.child.size.width,
        y: this.size.height - this.child.size.height,
      })
    )
  }
}

export default RenderAligningShiftedBox
