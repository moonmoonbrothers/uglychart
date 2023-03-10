import RenderObject from "./RenderObject"

/*
  It is counterpart to RenderShiftedBox of Flutter.
*/
class SingleChildRenderObject extends RenderObject {
  get child(): RenderObject | undefined {
    return this.children[0]
  }
  
  override getIntrinsicWidth(height: number): number {
    return this.child?.getIntrinsicWidth(height) || 0
  }

  override getIntrinsicHeight(width: number): number {
    return this.child?.getIntrinsicHeight(width) || 0
  }
}

export default SingleChildRenderObject
