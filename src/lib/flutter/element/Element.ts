import { children } from "svelte/internal"
import type RenderObject from "../renderobject/RenderObject"
import type Widget from "../widget/Widget"
import RenderObjectElement from "./RenderObjectElement"

class Element {
  widget: Widget
  parent?: Element
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
        child.visitChildren(visitor)
      }
    }
    visitor(this)

    if (result == null) throw { message: "can not find render object" }
    return result
  }

  rebuild() {
    const visitor = (child: Element) => {
      child.performRebuild()
      child.visitChildren(visitor)
    }
    visitor(this)
  }

  protected performRebuild() {
    throw { message: "not implemented rebuild" }
  }
}

export default Element
