import type ComponentWidget from "../widget/ComponentWidget";
import type Widget from "../widget/Widget";
import Element from "./Element";

class ComponentElement extends Element {
  child!: Element;

  declare widget: ComponentWidget;
  constructor(widget: ComponentWidget) {
    super(widget);
    this.widget = widget;
  }

  override mount(newParent?: Element | undefined): void {
    super.mount(newParent);
    this._firstBuild();
  }

  override update(newWidget: Widget): void {
    super.update(newWidget);
    this.rebuild({ force: true });
  }

  initState(): void {
    this.widget.initState(this);
  }

  build(): Widget {
    return this.widget.build(this);
  }

  _firstBuild() {
    this.performRebuild();
  }

  override performRebuild(): void {
    this.initState();
    const built = this.build();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.child = this.updateChild(this.child, built)!;
  }

  override visitChildren(visitor: (child: Element) => void): void {
    visitor(this.child);
  }
}

export default ComponentElement;
