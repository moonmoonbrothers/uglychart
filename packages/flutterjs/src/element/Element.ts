import type RenderObject from "../renderobject/RenderObject"
import type { Owner } from "../runApp"
import Widget from "../widget/Widget"
import RenderObjectElement from "./RenderObjectElement"

class Element {
  owner!: Owner
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

  //There are 5 case
  // 1. child is not null, but widget is null
  // in this case, child must be unmounted
  // 2. child is null, widget is null
  // nothing happend
  // 3. child is null, widget is not null
  // newWidget would be inflated,
  // 4. child is not null, widget is not null, and widget can be update
  // in this case, just update widget configruation
  // 5. it is similar to 4 but widget can not be update,
  // in this case, child must be unmounted and newWidget would be inflated
  updateChild(
    child?: Element | null,
    newWidget?: Widget | null
  ): Element | null | undefined {
    if (child != null && newWidget == null) {
      child.unmount()
      return null
    } else if (child == null && newWidget == null) {
      //nothing happen
    } else if (child == null && newWidget != null) {
      return this.inflateWidget(newWidget)
    } else if (
      child != null &&
      newWidget != null &&
      Widget.canUpdate(child.widget, newWidget)
    ) {
      child.update(newWidget)
      return child
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      child!.unmount()
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.inflateWidget(newWidget!)
    }
  }

  unmount() {
    this.parent = undefined
    this.renderObject.dispose(this.owner.paintContext)
  }

  mount(newParent?: Element) {
    if (newParent) {
      this.owner = newParent.owner
    }
    this.parent = newParent
  }

  update(newWidget: Widget) {
    this.widget = newWidget
  }

  inflateWidget(childWidget: Widget): Element {
    const newChild = childWidget.createElement()
    newChild.mount(this)
    return newChild
  }

  rebuild() {
    this.performRebuild()
  }

  protected performRebuild() {
    throw { message: "not implemented rebuild" }
  }
}

export default Element
