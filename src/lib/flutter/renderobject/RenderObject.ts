import type RenderObjectElement from "../element/RenderObjectElement"
import { Size, Offset, Constraint } from "../type"
import type { PaintContext } from "../utils/type"
import ShortUniqueId from "short-unique-id"

const uid = new ShortUniqueId({ dictionary: "hex" })

class RenderObject {
  id = "#" + uid.randomUUID(6)
  ownerElement!: RenderObjectElement
  get children(): RenderObject[] {
    return this.ownerElement.children.map((child) => child.renderObject)
  }
  size: Size = Size.zero()
  constraint: Constraint = Constraint.loose(Size.maximum())
  offset: Offset = Offset.zero()

  layout(constraint: Constraint) {
    this.constraint = constraint.normalize()
    this.preformLayout()
  }

  paint(context: PaintContext, offset: Offset) {
    const { ctx } = context
    const totalOffset = offset.plus(this.offset)
    ctx.save()
    ctx.translate(totalOffset.x, totalOffset.y)
    this.performPaint(context)
    ctx.restore()

    this.children.forEach((child) => child.paint(context, totalOffset))
  }

  attach(ownerElement: RenderObjectElement) {
    this.ownerElement = ownerElement
  }

  dispose() {
    // TODO
    this.children.forEach(child => child.dispose())
  }

  getIntrinsicWidth() {
    return 0
  }

  getIntrinsicHeight() {
    return 0
  }

  /*
   * Do not call this method directly. instead call layout
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected preformLayout(): void {
    throw { message: "not implemented performLayout" }
  }

  /*
   * Do not call this method directly. instead call paint
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  protected performPaint(context: PaintContext): void {}
}

export default RenderObject
