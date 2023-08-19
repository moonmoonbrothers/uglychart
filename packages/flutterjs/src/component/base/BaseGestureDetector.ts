import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject";
import type { PaintContext } from "../../utils/type";
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget";
import type Widget from "../../widget/Widget";

class BaseGestureDetector extends SingleChildRenderObjectWidget {
  onClick?: () => void;
  constructor({
    child,
    onClick,
    key,
  }: {
    child?: Widget;
    onClick?: () => void;
    key?: any;
  }) {
    super({ child, key });
    this.onClick = onClick;
  }

  override createRenderObject(): RenderGestureDetector {
    return new RenderGestureDetector({ onClick: this.onClick });
  }

  updateRenderObject(renderObject: RenderGestureDetector): void {
    renderObject.onClick = this.onClick;
  }
}

class RenderGestureDetector extends SingleChildRenderObject {
  private mountedOnBroswer: boolean = false;
  private _onClick: () => void;
  get onClick(): () => void {
    return this._onClick;
  }
  set onClick(prop: (() => void) | undefined) {
    if (this.onClick === prop) return;
    this._onClick = prop ?? function () {};
    this.markNeedsPaint();
  }
  constructor({ onClick = () => {} }: { onClick?: () => void }) {
    super({ isPainter: true });
    this._onClick = onClick;
  }

  protected performPaint(
    { rect }: { rect: SVGRectElement },
    { isOnBrowser }: PaintContext
  ): void {
    if (!this.mountedOnBroswer && isOnBrowser) {
      this.mountedOnBroswer = true;
      rect.addEventListener("click", () => this.onClick());
    }
    rect.setAttribute("width", `${this.size.width}`);
    rect.setAttribute("height", `${this.size.height}`);
  }

  createDefaultSvgEl({ createSvgEl }: PaintContext) {
    const rect = createSvgEl("rect");
    rect.setAttribute("pointer-events", "auto");
    rect.setAttribute("cursor", "pointer");
    rect.setAttribute("fill", "transparent");
    return {
      rect,
    };
  }
}

export default BaseGestureDetector;
