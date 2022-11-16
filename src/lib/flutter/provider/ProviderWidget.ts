import Element from "../element/Element"
import Widget from "../widget/Widget"

class ProviderWidget<ProviderKey, Value> extends Widget {
  providerKey: ProviderKey
  value: Value
  child: Widget
  constructor({
    child,
    providerKey,
    value,
  }: {
    child: Widget
    providerKey: ProviderKey
    value: Value
  }) {
    super()
    this.child = child
    this.providerKey = providerKey
    this.value = value
  }

  static of<V>(key: unknown, context: Element) {
    let parent = context.parent
    while (parent != null) {
      const current = parent
      parent = current.parent
      if (!(current instanceof ProviderElement)) continue
      if (current.providerKey !== key) continue

      return current.value as V
    }

    throw { message: "can not find requested provider value" }
  }

  override createElement(): ProviderElement {
    return new ProviderElement(this)
  }
}

class ProviderElement extends Element {
  override widget: ProviderWidget<unknown, unknown>
  private _child!: Element
  get child() {
    return this._child
  }
  set child(value: Element) {
    value.parent = this
    this._child = value
  }

  get providerKey() {
    return this.widget.providerKey
  }
  get value() {
    return this.widget.value
  }

  visitChildren(visitor: (child: Element) => void): void {
    visitor(this.child)
  }

  constructor(widget: ProviderWidget<unknown, unknown>) {
    super(widget)
    this.widget = widget
    this.child = widget.child.createElement()
  }
}

export default ProviderWidget
