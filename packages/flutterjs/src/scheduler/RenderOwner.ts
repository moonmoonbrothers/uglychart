import RenderObject from "../renderobject/RenderObject";
import { PaintContext } from "../utils/type";
class RenderOwner {
  paintContext: PaintContext;
  private onNeedVisualUpdate: () => void;
  needsPaintRenderObjects: RenderObject[] = [];
  needsLayoutRenderObjects: RenderObject[] = [];
  constructor({
    onNeedVisualUpdate,
    paintContext,
  }: {
    onNeedVisualUpdate: () => void;
    paintContext: PaintContext;
  }) {
    this.onNeedVisualUpdate = onNeedVisualUpdate;
    this.paintContext = paintContext;
  }

  requestVisualUpdate() {
    this.onNeedVisualUpdate();
  }

  drawFrame() {
    this.flushLayout();
    this.flushPaint();
  }

  private flushLayout() {
    const dirties = this.needsLayoutRenderObjects;
    this.needsLayoutRenderObjects = [];

    dirties
      .sort((a, b) => a.depth - b.depth)
      .forEach((renderObject) => {
        if (!renderObject.needsLayout) return;
        renderObject.layoutWithoutResize();
      });
  }

  private flushPaint() {
    const dirties = this.needsPaintRenderObjects;
    this.needsPaintRenderObjects = [];

    dirties
      .sort((a, b) => a.depth - b.depth)
      .forEach((renderObject) => {
        if (!renderObject.needsPaint) return;
        renderObject.paintWithoutLayout(this.paintContext);
      });
  }
}

export default RenderOwner;
