import {
  Element,
  GestureDetector,
  SizedBox,
  Stack,
  StackFit,
  State,
  StatefulWidget,
  Widget,
} from "@moonmoonbrothers/flutterjs";

export type TooltipPosition =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "centerLeft"
  | "centerRight";

class ToolTip extends StatefulWidget {
  child: Widget;
  tooltip: Widget;
  constructor({
    key,
    child,
    tooltip,
  }: {
    key?: any;
    child: Widget;
    tooltip: Widget;
  }) {
    super(key);
    this.child = child;
    this.tooltip = tooltip;
  }

  createState(): State<StatefulWidget> {
    return new ToolTipState();
  }
}

class ToolTipState extends State<ToolTip> {
  show: boolean = false;

  build(context: Element): Widget {
    return Stack({
      fit: StackFit.passthrough,
      clipped: false,
      children: [
        GestureDetector({
          child: this.widget.child,
        }),
        this.show ? this.widget.tooltip : SizedBox.shrink(),
      ],
    });
  }
}

export default ToolTip;
