import type ComponentWidget from "../widget/ComponentWidget"
import type Widget from "../widget/Widget"
import Element from "./Element"

class ComponentElement extends Element {
  _child!: Element
  get child(): Element {
    return this._child
  }
  set child(value: Element) {
    this._child = value
    this._child.parent = this
  }

  override widget: ComponentWidget
  constructor(widget: ComponentWidget) {
    super(widget)
    this.widget = widget
    this.initState()
    this.child = this.build().createElement()
  }

  initState(): void {
    this.widget.initState(this)
  }

  build(): Widget {
    return this.widget.build(this)
  }

  override performRebuild(): void {
    this.child = this.build().createElement()
  }

  override visitChildren(visitor: (child: Element) => void): void {
    visitor(this.child)
  }
}

export default ComponentElement
