import Widget from "../widget/Widget";
import ComponentElement from "./ComponentElement";
import StatefulWidget from "../widget/StatefulWidget";
import Element from "./Element";

export class StatefulElement extends ComponentElement {
  state: State<StatefulWidget>;

  constructor(widget: StatefulWidget) {
    super(widget);
    this.state = widget.createState();
    this.state.element = this;
  }

  initState(): void {
    return this.state.initState(this);
  }

  build(): Widget {
    return this.state.build(this);
  }
}

export class State<T> {
  get widget(): T {
    return this.element.widget as T;
  }
  element: StatefulElement;
  initState(context: Element) {}
  build(context: Element): Widget {
    throw Error("not implemented state");
  }
  setState(callback?: () => any) {
    callback?.();
    this.element.markNeedsBuild();
  }
}
