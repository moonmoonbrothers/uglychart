import RenderObject from "./RenderObject"

class SingleChildRenderObject extends RenderObject {
  get child(): RenderObject | undefined {
    return this.children[0]
  }
  
  override getIntrinsicWidth(): number {
    return this.child?.getIntrinsicWidth() || 0
  }

  override getIntrinsicHeight(): number {
    return this.child?.getIntrinsicHeight() || 0
  }
}

export default SingleChildRenderObject
