import type RenderObjectElement from "../element/RenderObjectElement"
import { Size, Offset, Constraint } from "../type"
import type { PaintContext } from "../utils/type"

class RenderObject {
  ownerElement!: RenderObjectElement
  get children(): RenderObject[] {
    return this.ownerElement.children.map((child) => child.renderObject)
  }
  size: Size = Size.zero()
  constraint: Constraint = Constraint.zero()
  offset: Offset = Offset.zero()

  layout(constraint: Constraint) {
    /* 
      constraint.normalize()로 할당해야 하는데 현재 에러 발생중.. 
      다른 컴포넌트의 레이아웃 정책이 올바른지 살펴봐야 함..
      일단 문제 없으니 냅둡니다.
    */
    this.constraint = constraint
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
