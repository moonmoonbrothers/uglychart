import SingleChildRenderObject from "$lib/flutter/renderobject/SingleChildRenderObject"
import { Size, type Constraint } from "$lib/flutter/type"
import SingleChildRenderObjectWidget from "$lib/flutter/widget/SingleChildRenderObjectWidget"
import type Widget from "$lib/flutter/widget/Widget"

class BaseContrainedBox extends SingleChildRenderObjectWidget {
  constraint: Constraint
  constructor({
    child,
    constraint,
  }: {
    child?: Widget
    constraint: Constraint
  }) {
    super({ child })
    this.constraint = constraint
  }

  createRenderObject(): SingleChildRenderObject {
    return new RenderContrainedBox({ constraint: this.constraint })
  }
}

class RenderContrainedBox extends SingleChildRenderObject {
  additionalConstraint: Constraint
  constructor({ constraint }: { constraint: Constraint }) {
    super()
    this.additionalConstraint = constraint
  }

  protected override preformLayout(): void {
    this.constraint = this.additionalConstraint.enforce(this.constraint)
    let size = Size.zero()
    if (this.child != null) {
      this.child.layout(this.constraint)
      size = this.child.size
    }
    this.size = size
  }
}

export default BaseContrainedBox
