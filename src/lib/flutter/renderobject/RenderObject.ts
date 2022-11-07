import type { PaintContext } from "../utils/type"

class RenderObject {
  children: RenderObject[] = []
  

  protected layout() {
    this.preformLayout()
  }

  protected paint(context: PaintContext) {
    const { ctx } = context
    ctx.save()
    this.performPaint(context)
    ctx.restore()

    this.children.forEach((child) => child.paint(context))
  }

  preformLayout(): void {
    throw { message: "not implemented" }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  performPaint(context: PaintContext): void {
    throw { message: "not implemented" }
  }
}

export default RenderObject
