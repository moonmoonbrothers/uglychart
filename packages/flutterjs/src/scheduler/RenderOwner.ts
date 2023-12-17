import RenderView from "../renderobject/RenderObject";
import { PaintContext } from "../utils/type";
class RenderOwner {
  paintContext: PaintContext;
  private onNeedVisualUpdate: () => void;
  needsPaintRenderObjects: RenderView[] = [];
  needsLayoutRenderObjects: RenderView[] = [];
  /*
   this will be set by RenderView
  */
  renderView!: RenderView;
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
    this.rearrangeDomOrder();
    this.flushPaint();
  }

  domOrderChanged: boolean = true;
  private rearrangeDomOrder() {
    if (!this.domOrderChanged) return;
    this.domOrderChanged = false;
    const painterRenderObjects: RenderView[] = [];

    this.preOrderTraversePainterRenderObjects(
      this.renderView,
      (renderObject) => {
        painterRenderObjects.push(renderObject);
      }
    );

    for (let i = painterRenderObjects.length - 1; i >= 0; i--) {
      const renderObject = painterRenderObjects[i];
      renderObject.domOrder = i;
      renderObject.rearrangeDomOrder();
    }
  }

  didDomOrderChange() {
    this.domOrderChanged = true;
  }

  private preOrderTraversePainterRenderObjects(
    renderObject: RenderView,
    callback: (renderObject: RenderView) => void
  ) {
    if (renderObject.isPainter) callback(renderObject);
    renderObject.children.forEach((child) => {
      this.preOrderTraversePainterRenderObjects(child, callback);
    });
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
