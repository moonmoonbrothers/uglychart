import type ComponentWidget from "../widget/ComponentWidget"
import type Widget from "../widget/Widget"
import Element from "./Element"

class ComponentElement extends Element {
  child: Element = this.build().createElement()

  build(): Widget {
    return (this.widget as ComponentWidget).build()
  }

  performRebuild(): void {
    this.child = this.build().createElement()
  }

  visitChildren(visitor: (child: Element) => void): void {
    visitor(this.child)
  }
}

export default ComponentElement
