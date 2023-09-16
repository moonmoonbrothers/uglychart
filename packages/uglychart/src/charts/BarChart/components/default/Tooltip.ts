import { StatefulWidget, Widget } from "@moonmoonbrothers/flutterjs";

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
  constructor({ key }: { key?: any; target: Widget; tooltip: Widget }) {
    super(key);
  }
}
