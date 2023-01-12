import RenderObject from "../../renderobject/RenderObject"
import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject"
import { Constraint } from "../../type"
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget"

export default class BaseIntrinsicHeight extends SingleChildRenderObjectWidget {
  createRenderObject(): SingleChildRenderObject {
    return new RenderIntrinsicHeight({ isPainter: false })
  }
  updateRenderObject(renderObject: RenderObject): void {}
}

class RenderIntrinsicHeight extends SingleChildRenderObject {
  protected preformLayout(): void {
    if (this.child == null) return
    const height = this.child.getIntrinsicHeight() || 0
    const constraint = Constraint.tightOnly({ height }).enforce(this.constraint)
    this.child.layout(constraint)
    this.size = this.child.size
  }
}
