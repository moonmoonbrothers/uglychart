import SingleChildRenderObject from "$lib/flutter/renderobject/SingleChildRenderObject"
import type Constraint from "$lib/flutter/utils/constraint"
import EdgeInsets from "$lib/flutter/utils/edgeInsets"
import Offset from "$lib/flutter/utils/offset"
import SingleChildRenderObjectWidget from "$lib/flutter/widget/SingleChildRenderObjectWidget"
import type Widget from "$lib/flutter/widget/Widget"

export default class Padding extends SingleChildRenderObjectWidget {
  padding: EdgeInsets
  constructor({
    padding = EdgeInsets.all(0),
    child,
  }: {
    padding?: EdgeInsets
    child: Widget
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
    if (this.child == null)
      throw { message: "RenderPadding doesn't have a child render object" }
    const { top, left, right, bottom } = this.padding

    this.child.offset = new Offset({ x: left, y: top })
  }
}
