import type RenderObjectElement from "../element/RenderObjectElement"
import { Size, Offset, Constraint } from "../type"
import type { PaintContext } from "../utils/type"
import ShortUniqueId from "short-unique-id"

const uid = new ShortUniqueId({ dictionary: "hex" })

class RenderObject {
  isPainter: boolean
  id = uid.randomUUID(6)
  ownerElement!: RenderObjectElement
  constructor({ isPainter }: { isPainter: boolean }) {
    this.isPainter = isPainter
  }
  type = this.constructor.name
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
    if (this.isPainter) {
      const svgEls = this.findOrAppendSvgEl(context)
      Object.values(svgEls).forEach((svgEl) =>
        svgEl.setAttribute(
          "transform",
          `translate(${totalOffset.x} ${totalOffset.y})`
        )
      )
      this.performPaint(svgEls)
    }
    this.children.forEach((child) => child.paint(context, totalOffset))
  }

  attach(ownerElement: RenderObjectElement) {
    this.ownerElement = ownerElement
  }

  dispose(context: PaintContext) {
    if (this.isPainter) {
      context.findSvgEl(this.id)?.remove()
    }
    this.children.forEach((child) => child.dispose(context))
  }

  getIntrinsicWidth() {
    return 0
  }

  getIntrinsicHeight() {
    return 0
  }

  private findOrAppendSvgEl(context: PaintContext) {
    const { findSvgEl, appendSvgEl } = context
    const oldEl = findSvgEl(this.id)
    let svgEls: { [key: string]: SVGElement } = {}
    if (oldEl) {
      if (oldEl.nodeName === "g") {
        for (const child of oldEl.children) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const name = child.getAttribute("data-render-name")!
          svgEls[name] = child as unknown as SVGElement
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const name = oldEl.getAttribute("data-render-name")!
        svgEls[name] = oldEl
      }
    } else {
      svgEls = this.createDefaultSvgEl(context)
      Object.entries(svgEls).forEach(([name, value]) => {
        value.setAttribute("data-render-name", name)
      })
      const values = Object.values(svgEls)
      if (values.length === 1) {
        const svgEl = values[0]
        context.setId(svgEl, this.id)
        svgEl.setAttribute("data-render-type", this.type)
        appendSvgEl(svgEl)
      } else {
        const svgG = context.createSvgEl("g")
        context.setId(svgG, this.id)
        appendSvgEl(svgG)
        svgG.setAttribute("data-render-type", this.type)
        values.forEach(value => {
          svgG.appendChild(value)
        })
      }
    }
    return svgEls
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected createDefaultSvgEl(paintContext: PaintContext): {
    [key: string]: SVGElement
  } {
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
  protected performPaint(svgEls: { [key: string]: SVGElement }): void {}
}

export default RenderObject