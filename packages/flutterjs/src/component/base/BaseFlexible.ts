import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject"
import { Size, Constraints } from "../../type"
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
  updateRenderObject(renderObject: RenderFlexible): void {
    renderObject.flex = this.flex
    renderObject.fit = this.fit
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
    super({ isPainter: false })
    this.flex = flex
    this.fit = fit
  }

  protected preformLayout(): void {
    const childConstraint =
      this.fit === "tight"
        ? Constraints.tight({
            width: this.constraint.maxWidth,
            height: this.constraint.maxHeight,
          })
        : this.constraint.loosen()
    let size = Size.zero()
    if (this.child != null) {
      this.child.layout(childConstraint)
      size = this.child.size
    }
    this.size = this.constraint.constrain(size)
  }
}

export default Flexible
