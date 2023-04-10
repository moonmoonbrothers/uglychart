/* eslint-disable @typescript-eslint/no-unused-vars */
import { Size, Constraints } from "../type"
import RenderObject from "./RenderObject"

class RenderView extends RenderObject {
  constructor() {
    super({ isPainter: false })
  }
  preformLayout(): void {
    const constraint = this.constraints
    if (!constraint.isTight)
      throw { message: "constraint must be tight on render view" }
    this.size = new Size({
      width: constraint.maxWidth,
      height: constraint.maxHeight,
    })
    this.children.forEach((child) => child.layout(Constraints.loose(this.size)))
  }
}

export default RenderView
