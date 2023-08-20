import {
  Offset,
  PaintContext,
  RenderObject,
  Widget,
  MultiChildRenderObject,
  MultiChildRenderObjectWidget,
  StatefulWidget,
  StatelessWidget,
  Element,
  Column,
  MainAxisAlignment,
  MainAxisSize,
  Row,
  Transform,
  SizedBox,
  GlobalKey,
  State,
} from "@moonmoonbrothers/flutterjs";
import { functionalizeClass } from "../utils";

class Temp extends StatefulWidget {
  content: Widget;
  childNodes: Widget[];
  translation: Offset;
  constructor({
    key,
    childNodes,
    content,
    translation = Offset.zero(),
  }: {
    key?: any;
    content: Widget;
    childNodes: Widget[];
    translation?: Offset;
  }) {
    super(key);
    this.content = content;
    this.childNodes = childNodes;
    this.translation = translation;
  }
  createState(): State<StatefulWidget> {
    return new TempState();
  }
}

class TempState extends State<Temp> {
  key1 = new GlobalKey();
  initState(context: Element): void {
    super.initState(context);
    this.getOffset(this.key1);
  }

  build(context: Element): Widget {
    const { translation, content, childNodes } = this.widget;
    return Column({
      mainAxisAlignment: MainAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: [
        Transform.translate({
          offset: translation,
          child: Column({
            mainAxisSize: MainAxisSize.min,
            children: [content, Vortex({ key: this.key1 })],
          }),
        }),
        SizedBox({ height: 30 }),
        Row({
          mainAxisSize: MainAxisSize.min,
          children: childNodes,
        }),
      ],
    });
  }

  private getOffset(key: GlobalKey) {
    this.element.scheduler.addPostFrameCallbacks(() => {
      const offset = this.key1.currentContext.renderObject.offset;
      console.log(offset);
    });
  }
}

class Node extends MultiChildRenderObjectWidget {
  translation: Offset = Offset.zero();
  constructor({
    translation: offset = Offset.zero(),
    children,
    key,
  }: {
    translation?: Offset;
    children: Widget[];
    key?: any;
  }) {
    super({ children, key });
    this.translation = offset;
  }
  createRenderObject(): RenderObject {
    return new RenderNode({ isPainter: true, translation: this.translation });
  }
  updateRenderObject(renderObject: RenderNode): void {
    renderObject.translation = this.translation;
  }
}

class RenderNode extends MultiChildRenderObject {
  private _translation: Offset;
  get translation() {
    return this._translation;
  }
  set translation(value: Offset) {
    if (this._translation.equals(value)) return;
    this._translation = value;
  }
  constructor({
    isPainter,
    translation,
  }: {
    isPainter: boolean;
    translation: Offset;
  }) {
    super({ isPainter });
  }

  protected createDefaultSvgEl(paintContext: PaintContext): {
    path: SVGElement;
  } {
    return {
      path: paintContext.createSvgEl("path"),
    };
  }

  protected preformLayout(): void {}

  protected performPaint(
    { path }: { path: SVGElement },
    context: PaintContext
  ): void {}
}

function Vortex({ key }: { key: GlobalKey }) {
  return SizedBox({ width: 0, height: 0, key });
}

export default functionalizeClass(Temp);
