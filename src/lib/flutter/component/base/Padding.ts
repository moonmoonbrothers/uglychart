import SingleChildRenderObject from "$lib/flutter/renderobject/SingleChildRenderObject"
import Constraint from "$lib/flutter/utils/constraint"
import EdgeInsets from "$lib/flutter/utils/edgeInsets"
import Offset from "$lib/flutter/utils/offset"
import Size from "$lib/flutter/utils/size"
import SingleChildRenderObjectWidget from "$lib/flutter/widget/SingleChildRenderObjectWidget"
import type Widget from "$lib/flutter/widget/Widget"

export default class Padding extends SingleChildRenderObjectWidget {
  padding: EdgeInsets
  constructor({
    padding = EdgeInsets.all(0),
    child,
  }: {
    padding?: EdgeInsets
    child?: Widget
  }) {
    super({ child })
    this.padding = padding
  }

  createRenderObject(): RenderPadding {
    return new RenderPadding({
      padding: this.padding,
    })
  }
}

class RenderPadding extends SingleChildRenderObject {
  padding: EdgeInsets
  constructor({ padding }: { padding: EdgeInsets }) {
    super()
    this.padding = padding
  }
  protected preformLayout(): void {
    if (this.child == null) return
    const { top, left, right, bottom } = this.padding
    const childContraint = new Constraint({
      ...this.constraint,
      maxHeight: this.constraint.maxHeight - (top + bottom),
      maxWidth: this.constraint.maxWidth - (left + right),
    }).normalize()

    this.child.layout(childContraint)
    const { size: childSize } = this.child

    this.size = this.constraint.constrain(
      new Size({
        width: childSize.width + left + right,
        height: childSize.height + top + bottom,
      })
    )

    this.child.offset = new Offset({ x: left, y: top })
  }
}
