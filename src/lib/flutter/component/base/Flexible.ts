import Constraint from "$lib/flutter/utils/constraint"
import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject"
import Size from "../../utils/size"
import type { PaintContext } from "../../utils/type"
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget"
import type Widget from "../../widget/Widget"

class Flexible extends SingleChildRenderObjectWidget {
  flex: number
  fit: "tight" | "loose"
  constructor({
    flex = 1,
    child,
    fit = "loose",
  }: { flex?: number; child?: Widget; fit?: "tight" | "loose" } = {}) {
    super({ child })
    if (flex <= 0) throw { message: "flex must be over zero" }
    this.flex = flex
    this.fit = fit
  }
  createRenderObject(): RenderFlexible {
    return new RenderFlexible({ flex: this.flex, fit: this.fit })
  }
}

export class RenderFlexible extends SingleChildRenderObject {
  flex: number
  fit: "tight" | "loose"
  constructor({
    flex,
    fit,
  }: {
    flex: number

    fit: "tight" | "loose"
  }) {
    super()
    this.flex = flex
    this.fit = fit
  }

  protected preformLayout(): void {
    const constraint =
      this.fit === "tight"
        ? Constraint.tight({
            width: this.constraint.maxWidth,
            height: this.constraint.maxHeight,
          })
        : Constraint.loose({
            width: this.constraint.maxWidth,
            height: this.constraint.maxHeight,
          })
    let size = Size.zero()
    if (this.child != null) {
      this.child.layout(constraint)
      size = this.child.size
    }
    this.size = constraint.constrain(size)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  protected performPaint(context: PaintContext): void {}
}

export default Flexible