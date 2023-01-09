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
  child!: Element

  get providerKey() {
    return this.widget.providerKey
  }

  get value() {
    return this.widget.value
  }

  visitChildren(visitor: (child: Element) => void): void {
    visitor(this.child)
  }

  mount(newParent?: Element | undefined): void {
    super.mount(newParent)
    this.child = this.inflateWidget(this.widget.child)
  }

  update(newWidget: Widget): void {
      super.update(newWidget)
      this.performRebuild()
  }

  protected override performRebuild(): void {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.child = this.updateChild(this.child, this.child.widget)!
  }

  constructor(widget: ProviderWidget<unknown, unknown>) {
    super(widget)
    this.widget = widget
  }
}

export default ProviderWidget
