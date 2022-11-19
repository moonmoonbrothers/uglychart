/* eslint-disable @typescript-eslint/no-unused-vars */
import { Size, Constraint } from "../type"
import type { PaintContext } from "../utils/type"
import RenderObject from "./RenderObject"

class RenderView extends RenderObject {
  preformLayout(): void {
    const constraint = this.constraint
    if (!constraint.isTight)
      throw { message: "constraint must be tight on render view" }
    this.size = new Size({
      width: constraint.maxWidth,
      height: constraint.maxHeight,
    })
    this.children.forEach((child) => child.layout(Constraint.loose(this.size)))
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected performPaint(context: PaintContext): void {}
}

export default RenderView
