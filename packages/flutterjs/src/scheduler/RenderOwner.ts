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
    //일단 임시구현하자
    // parent까지 구해가지고 그건 처리해보자고!
  }

  private flushPaint() {
    const dirties = this.needsPaintRenderObjects;
    this.needsPaintRenderObjects = [];

    dirties
      .sort((a, b) => a.depth - b.depth)
      .forEach((renderObject) => {
        if (!renderObject.needsPaint) return;
        renderObject.paint(
          this.paintContext,
          renderObject.clipId,
          renderObject.matrix,
          renderObject.opacity
        );
      });
  }
}

export default RenderOwner;
