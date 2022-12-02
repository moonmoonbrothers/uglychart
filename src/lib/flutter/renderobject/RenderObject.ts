import type RenderObjectElement from "../element/RenderObjectElement"
import { Size, Offset, Constraint } from "../type"
import type { PaintContext } from "../utils/type"
import ShortUniqueId from "short-unique-id"

const uid = new ShortUniqueId({ dictionary: "hex" })

class RenderObject {
  id = uid.randomUUID(6)
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
    const totalOffset = offset.plus(this.offset)
    this.performPaint(context, totalOffset)
    this.children.forEach((child) => child.paint(context, totalOffset))
  }

  attach(ownerElement: RenderObjectElement) {
    this.ownerElement = ownerElement
  }

  dispose(context: PaintContext) {
    context.findSvgEl(this.id)?.remove()
    this.children.forEach((child) => child.dispose(context))
  }

  getIntrinsicWidth() {
    return 0
  }

  getIntrinsicHeight() {
    return 0
  }

  findOrAppendSvgEl(
    context: PaintContext,
    offset: Offset
  ): SVGElement {
    const {findSvgEl, appendSvgEl} = context
    let svgEl:SVGElement
    const oldEl = findSvgEl(this.id)
    if (oldEl) {
      svgEl = oldEl
    } else {
      svgEl = this.createDefaultSvgEl(context)
      appendSvgEl(svgEl)
    }
      svgEl.setAttribute('x', `${offset.x}`)
      svgEl.setAttribute('y', `${offset.y}`)
      return svgEl
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createDefaultSvgEl(paintContext: PaintContext): SVGElement {
    throw { message: "not implemented defaultSvgEl" }
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
  protected performPaint(context: PaintContext, offset: Offset): void {}
}

export default RenderObject
