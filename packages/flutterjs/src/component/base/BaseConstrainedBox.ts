import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject"
import { Size, Constraints } from "../../type"
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget"
import type Widget from "../../widget/Widget"

class BaseConstraintBox extends SingleChildRenderObjectWidget {
  constraint: Constraints
  constructor({
    child,
    constraint,
  }: {
    child?: Widget
    constraint: Constraints
  }) {
    super({ child })
    this.constraint = constraint
  }

  createRenderObject(): SingleChildRenderObject {
    return new RenderConstraintBox({ constraint: this.constraint })
  }

  updateRenderObject(renderObject: RenderConstraintBox): void {
    renderObject.constraints = this.constraint
  }
}

class RenderConstraintBox extends SingleChildRenderObject {
  additionalConstraint: Constraints
  constructor({ constraint }: { constraint: Constraints }) {
    super({ isPainter: false })
    this.additionalConstraint = constraint
  }

  protected override preformLayout(): void {
    this.constraints = this.additionalConstraint.enforce(this.constraints)
    let size = Size.zero()
    if (this.child != null) {
      this.child.layout(this.constraints)
      size = this.child.size
    }
    this.size = this.constraints.constrain(size)
  }

  override getIntrinsicHeight(): number {
    if (this.additionalConstraint.hasTightHeight)
      return this.additionalConstraint.minHeight
    return Math.max(
      this.additionalConstraint.minHeight,
      this.child?.getIntrinsicHeight() || 0
    )
  }

  override getIntrinsicWidth(): number {
    if (this.additionalConstraint.hasTightWidth)
      return this.additionalConstraint.minWidth
    return Math.max(
      this.additionalConstraint.minWidth,
      this.child?.getIntrinsicWidth() || 0
    )
  }
}

export default BaseConstraintBox
