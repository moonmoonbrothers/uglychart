import type RenderObject from "../renderobject/RenderObject"
import type RenderObjectWidget from "../widget/RenderObjectWidget"
import Element from "./Element"

class RenderObjectElement extends Element {
  _children!: Element[]
  get children() {
    return this._children
  }
  set children(value: Element[]) {
    this._children = value
    this._children.forEach((child) => (child.parent = this))
  }

  _renderObject: RenderObject
  createRenderObject() {
    return (this.widget as RenderObjectWidget).createRenderObject()
  }

  constructor(widget: RenderObjectWidget) {
    super(widget)
    this.children = widget.children.map((child) => child.createElement())
    this._renderObject = this.createRenderObject()
    this._renderObject.children = this.children.map(
      (child) => child.renderObject
    )
  }

  performRebuild(): void {
    this.children = (this.widget as RenderObjectWidget).children.map((child) =>
      child.createElement()
    )
    this._renderObject = this.createRenderObject()
    this._renderObject.children = this.children.map(
      (child) => child.renderObject
    )
  }

  visitChildren(visitor: (child: Element) => void): void {
    this.children.forEach(visitor)
  }
}

export default RenderObjectElement
