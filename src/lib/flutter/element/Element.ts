import type RenderObject from "../renderobject/RenderObject"
import type Widget from "../widget/Widget"
import RenderObjectElement from "./RenderObjectElement"

class Element {
  widget: Widget
  constructor(widget: Widget) {
    this.widget = widget
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  visitChildren(visitor: (child: Element) => void) {
    throw { message: "not implemented" }
  }

  get renderObject(): RenderObject {
    let result: RenderObject | null = null
    const visitor = (child: Element) => {
      if (child instanceof RenderObjectElement) {
        result = child._renderObject
      } else {
        this.visitChildren(visitor)
      }
    }
    visitor(this)

    if (result == null) throw { message: "can not find render object" }
    return result
  }

  rebuild() {
    this.performRebuild()
  }

  performRebuild() {
    throw { message: "not implemented" }
  }
}

export default Element
