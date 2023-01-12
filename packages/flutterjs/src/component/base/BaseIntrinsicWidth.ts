import RenderObject from "../../renderobject/RenderObject"
import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject"
import { Constraint } from "../../type"
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget"

export default class BaseIntrinsicWidth extends SingleChildRenderObjectWidget {
  createRenderObject(): SingleChildRenderObject {
    return new RenderIntrinsicWidth({ isPainter: false })
  }
  updateRenderObject(renderObject: RenderObject): void {}
}

class RenderIntrinsicWidth extends SingleChildRenderObject {
  protected preformLayout(): void {
    if (this.child == null) return
    const width = this.child.getIntrinsicWidth() || 0
    const constraint = Constraint.tightOnly({ width }).enforce(this.constraint)
    this.child.layout(constraint)
    this.size = this.child.size
  }
}
