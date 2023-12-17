import { RenderZIndex } from "../component/base/BaseZIndex";
import RenderObject from "../renderobject/RenderObject";
import RenderView from "../renderobject/RenderObject";
import RenderObjectVisitor from "../renderobject/RenderObjectVisitor";
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
    const domOrderVisitor = new DomOrderVisitor();
    this.renderView.accept(domOrderVisitor);

    const painterRenderObjects = domOrderVisitor.getRenderObjectsByDomOrder();

    for (let i = painterRenderObjects.length - 1; i >= 0; i--) {
      const renderObject = painterRenderObjects[i];
      renderObject.domOrder = i;
      renderObject.rearrangeDomOrder();
    }
  }

  didDomOrderChange() {
    this.domOrderChanged = true;
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

class DomOrderVisitor implements RenderObjectVisitor {
  private renderObjectsWithZIndexContext: {
    renderObject: RenderObject;
    visitedOrder: number;
    zIndexContext: number[];
  }[] = [];
  private visitedOrder = 0;
  private currentZIndexContext: number[] = [0];

  private visit(renderObject: RenderObject) {
    this.renderObjectsWithZIndexContext.push({
      renderObject,
      zIndexContext: this.currentZIndexContext,
      visitedOrder: this.visitedOrder++,
    });

    renderObject.visitChildren((child) => {
      child.accept(this);
    });
  }

  visitGeneral(renderObject: RenderObject): void {
    this.visit(renderObject);
  }

  visitZIndex(renderObject: RenderZIndex) {
    /**
     * This is a hack to optimize memory in order to reuse currentZIndexContext until ZIndexRenderObject is visited.
     */
    this.currentZIndexContext = [...this.currentZIndexContext];
    this.currentZIndexContext.push(renderObject.zIndex);

    this.visit(renderObject);

    this.currentZIndexContext = [...this.currentZIndexContext];
    this.currentZIndexContext.pop();
  }

  getRenderObjectsByDomOrder(): RenderObject[] {
    const painterRenderObjects = this.renderObjectsWithZIndexContext.filter(
      ({ renderObject: { isPainter } }) => isPainter
    );

    const sorted = painterRenderObjects.sort((a, b) => {
      const limit = Math.min(a.zIndexContext.length, b.zIndexContext.length);

      for (let i = 0; i < limit; i++) {
        if (a.zIndexContext[i] !== b.zIndexContext[i]) {
          return a.zIndexContext[i] - b.zIndexContext[i];
        }
      }

      if (a.zIndexContext.length !== b.zIndexContext.length) {
        const aLimit = a.zIndexContext[limit] ?? 0;
        const bLimit = b.zIndexContext[limit] ?? 0;
        if (aLimit !== bLimit) {
          return aLimit - bLimit;
        }
      }

      return a.visitedOrder - b.visitedOrder;
    });

    return sorted.map(({ renderObject }) => renderObject);
  }
}

export default RenderOwner;
