import type RenderObject from "../renderobject/RenderObject"
import type RenderObjectWidget from "../widget/RenderObjectWidget"
import Element from "./Element"

class RenderObjectElement extends Element {
  private _children!: Element[]
  get children() {
    return this._children
  }
  set children(value: Element[]) {
    value.forEach((child) => (child.parent = this))
    this._children = value
  }

  _renderObject!: RenderObject
  createRenderObject() {
    const renderObject =(this.widget as RenderObjectWidget).createRenderObject()
    renderObject.attach(this)
    return renderObject
  }

  constructor(widget: RenderObjectWidget) {
    super(widget)
  }

  performRebuild(): void {
    this.children = (this.widget as RenderObjectWidget).children.map((child) =>
      child.createElement()
    )
    this._renderObject = this.createRenderObject()
  }

  visitChildren(visitor: (child: Element) => void): void {
    this.children.forEach(visitor)
  }
}

export default RenderObjectElement
