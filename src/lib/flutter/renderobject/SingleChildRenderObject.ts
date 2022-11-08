import RenderObject from "./RenderObject"

class SingleChildRenderObject extends RenderObject {
  get child(): RenderObject | undefined {
    return this.children[0]
  }
}

export default SingleChildRenderObject
