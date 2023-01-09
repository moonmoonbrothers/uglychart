/* eslint-disable @typescript-eslint/no-unused-vars */
import { Size, Constraint } from "../type"
import type { PaintContext } from "../utils/type"
import RenderObject from "./RenderObject"

class RenderView extends RenderObject {
  constructor() {
    super({ isPainter: false })
  }
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
}

export default RenderView
