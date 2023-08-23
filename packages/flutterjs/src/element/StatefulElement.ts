import Widget from "../widget/Widget";
import ComponentElement from "./ComponentElement";
import StatefulWidget from "../widget/StatefulWidget";
import { BuildContext } from "../widget";

export class StatefulElement extends ComponentElement {
  state: State<StatefulWidget>;

  constructor(widget: StatefulWidget) {
    super(widget);
    this.state = widget.createState();
    this.state.widget = widget;
    this.state.element = this;
  }

  initState(): void {
    return this.state.initState(this);
  }
  build(): Widget {
    return this.state.build(this);
  }

  unmount(): void {
    super.unmount();
    this.state.dispose();
  }

  update(newWidget: StatefulWidget): void {
    const oldWidget = this.state.widget;
    this.state.widget = newWidget;
    this.state.didUpdateWidget(oldWidget);
    super.update(newWidget);
  }
}

export class State<T extends StatefulWidget> {
  widget: T;
  element: StatefulElement;
  initState(context: BuildContext) {}
  build(context: BuildContext): Widget {
    throw Error("not implemented state build");
  }
  setState(callback?: () => any) {
    callback?.();
    this.element.markNeedsBuild();
  }
  dispose() {}
  didUpdateWidget(oldWidget: T) {}
}
