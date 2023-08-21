import {
  Element,
  GestureDetector,
  Offset,
  State,
  StatefulWidget,
  Transform,
  Widget,
} from "@moonmoonbrothers/flutterjs";

class Draggable extends StatefulWidget {
  onDrag?: (event: { offset: Offset }) => void;
  child: Widget;
  constructor({
    onDrag,
    key,
    child,
  }: {
    onDrag?: (event: { offset: Offset }) => void;
    key?: any;
    child: Widget;
  }) {
    super(key);
    this.onDrag = onDrag;
    this.child = child;
  }

  createState(): State<StatefulWidget> {
    return new DraggableState();
  }
}

class DraggableState extends State<Draggable> {
  origin?: Offset;
  delta: Offset = Offset.zero();

  handleMouseDown({ x, y }: MouseEvent): void {
    this.origin = new Offset({ x, y });
  }

  handleMouseMove({ x, y }: MouseEvent): void {
    if (this.origin == null) return;
    this.delta = new Offset({ x, y }).minus(this.origin);
    this.widget.onDrag?.({ offset: this.delta });
  }

  handleMouseUp(event: MouseEvent): void {
    this.origin = undefined;
  }

  build(context: Element): Widget {
    return Transform.translate({
      offset: this.delta,
      child: GestureDetector({
        onMouseDown: this.handleMouseDown,
        onMouseMove: this.handleMouseMove,
        onMouseUp: this.handleMouseUp,
        child: this.widget.child,
      }),
    });
  }
}
