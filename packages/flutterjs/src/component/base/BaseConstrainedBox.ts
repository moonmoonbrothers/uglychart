import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject"
import { Size, Constraints } from "../../type"
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget"
import type Widget from "../../widget/Widget"

class BaseConstrainedBox extends SingleChildRenderObjectWidget {
  constraints: Constraints
  constructor({
    child,
    constraints,
  }: {
    child?: Widget
    constraints: Constraints
  }) {
    super({ child })
    this.constraints = constraints
  }

  createRenderObject(): SingleChildRenderObject {
    return new RenderConstrainedBox({ constraint: this.constraints })
  }

  updateRenderObject(renderObject: RenderConstrainedBox): void {
    renderObject.constraints = this.constraints
  }
}

class RenderConstrainedBox extends SingleChildRenderObject {
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

  override getIntrinsicHeight(width: number): number {
    if (
      this.additionalConstraint.hasBoundedHeight &&
      this.additionalConstraint.hasTightHeight
    ) {
      return this.additionalConstraint.minHeight
    }
    const height = super.getIntrinsicHeight(width)

    if (!this.additionalConstraint.hasInfiniteHeight) {
      return this.additionalConstraint.constrainHeight(width)
    }

    return height
  }

  override getIntrinsicWidth(height: number): number {
    if (
      this.additionalConstraint.hasBoundedWidth &&
      this.additionalConstraint.hasTightWidth
    ) {
      return this.additionalConstraint.minWidth
    }
    const width = super.getIntrinsicWidth(height)
    if (!this.additionalConstraint.hasInfiniteWidth) {
      return this.additionalConstraint.constrainWidth(height)
    }

    return width
  }
}

export default BaseConstrainedBox
