import RenderObjectElement from "../element/RenderObjectElement"
import type RenderObject from "../renderobject/RenderObject"
import Widget from "./Widget"

class RenderObjectWidget extends Widget {
  children: Widget[]

  constructor({ children }: { children: Widget[] }) {
    super()
    this.children = children
  }

  createElement(): RenderObjectElement {
    return new RenderObjectElement(this)
  }

  createRenderObject(): RenderObject {
    throw { message: "not implemented" }
  }
}

export default RenderObjectWidget
