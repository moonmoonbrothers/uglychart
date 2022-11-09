import SingleChildRenderObject from "../renderobject/SingleChildRenderObject"
import type Constraint from "../utils/constraint"
import Size from "../utils/size"
import type { PaintContext } from "../utils/type"
import SingleChildRenderObjectWidget from "../widget/SingleChildRenderObjectWidget"
import type Widget from "../widget/Widget"

class FlexItem extends SingleChildRenderObjectWidget {
  flex = 0
  constructor({ flex = 0, child }: { flex?: number; child?: Widget } = {}) {
    super({ child })
    this.flex = flex
  }
  createRenderObject(): RenderFlexItem {
    return new RenderFlexItem({ flex: this.flex })
  }
}

export class RenderFlexItem extends SingleChildRenderObject {
  flex: number
  constructor({ flex }: { flex: number }) {
    super()
    this.flex = flex
  }

  protected preformLayout(constraint: Constraint): void {
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

export default FlexItem
