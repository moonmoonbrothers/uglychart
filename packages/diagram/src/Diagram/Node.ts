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
} from "@moonmoonbrothers/flutterjs";
import { functionalizeClass } from "../utils";

class Temp extends StatelessWidget {
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

  build(context: Element): Widget {
    return Column({
      mainAxisAlignment: MainAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: [
        Transform.translate({
          offset: this.translation,
          child: this.content,
        }),
        Row({
          mainAxisSize: MainAxisSize.min,
          children: this.childNodes,
        }),
      ],
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

export default functionalizeClass(Node);
