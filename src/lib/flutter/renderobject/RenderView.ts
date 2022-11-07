/* eslint-disable @typescript-eslint/no-unused-vars */
import type Constraint from "../utils/constraint"
import Size from "../utils/size"
import type { PaintContext } from "../utils/type"
import RenderObject from "./RenderObject"

class RenderView extends RenderObject {
  preformLayout(constraint: Constraint): void {
    if (!constraint.isTight)
      throw { message: "constraint must be tight on render view" }
    this.size = new Size({
      width: constraint.maxWidth,
      height: constraint.maxHeight,
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected performPaint(context: PaintContext): void {}
}

export default RenderView
