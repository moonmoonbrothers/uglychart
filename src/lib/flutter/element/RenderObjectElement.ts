import type RenderObject from "../renderobject/RenderObject"
import type RenderObjectWidget from "../widget/RenderObjectWidget"
import Widget from "../widget/Widget"
import Element from "./Element"

class RenderObjectElement extends Element {
  children!: Element[]

  _renderObject!: RenderObject
  createRenderObject() {
    const renderObject =(this.widget as RenderObjectWidget).createRenderObject()
    renderObject.attach(this)
    return renderObject
  }

  constructor(widget: RenderObjectWidget) {
    super(widget)
  }

  override mount(newParent?: Element | undefined): void {
    super.mount(newParent)
    this._renderObject = this.createRenderObject()
    this.children = (this.widget as RenderObjectWidget).children.map(this.inflateWidget)
  }

  override update(newWidget: Widget): void {
    super.update(newWidget)
    this.performRebuild() // calls widget.updateRenderObject()
    const newChildWidgets = (this.widget as RenderObjectWidget).children
    this.updateChilren(newChildWidgets)
  }

  updateChilren(newWidgets: Widget[]) {
    const updatedChildIndexes: number[] = []
    const oldChildren = this.children
    const newChildren = newWidgets.map((newWidget) => {
      const matchedChildIndex = oldChildren.findIndex ((oldChild, oldChildIndex) => 
        !updatedChildIndexes.includes(oldChildIndex)
        && Widget.canUpdate(newWidget, oldChild.widget)
       )

      let matchedChild: Element | null 
      if(matchedChildIndex === -1) { 
        matchedChild = null
      } else {
        matchedChild = oldChildren[matchedChildIndex]
        updatedChildIndexes.push(matchedChildIndex)
      }

      return this.updateChild(matchedChild, newWidget)
    })

    oldChildren.forEach((oldChild, i) => {
      if(updatedChildIndexes.includes(i)) return
      oldChild.unmount()
    })

    this.children = newChildren as Element[]
  }

  performRebuild(): void {
    (this.widget as RenderObjectWidget).updateRenderObject(this._renderObject)
  }

  visitChildren(visitor: (child: Element) => void): void {
    this.children.forEach(visitor)
  }
}

export default RenderObjectElement
