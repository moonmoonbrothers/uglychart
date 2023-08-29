import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject";
import type { PaintContext } from "../../utils/type";
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget";
import type Widget from "../../widget/Widget";

class BaseGestureDetector extends SingleChildRenderObjectWidget {
  onClick?: () => void;
  onMouseUp?: (e: MouseEvent) => void;
  onMouseMove?: (e: MouseEvent) => void;
  onMouseDown?: (e: MouseEvent) => void;
  constructor({
    child,
    onClick,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    key,
  }: {
    child?: Widget;
    onClick?: () => void;
    onMouseUp?: (e: MouseEvent) => void;
    onMouseMove?: (e: MouseEvent) => void;
    onMouseDown?: (e: MouseEvent) => void;
    key?: any;
  }) {
    super({ child, key });
    this.onClick = onClick;
    this.onMouseDown = onMouseDown;
    this.onMouseMove = onMouseMove;
    this.onMouseUp = onMouseUp;
  }

  override createRenderObject(): RenderGestureDetector {
    return new RenderGestureDetector({
      onClick: this.onClick,
      onMouseDown: this.onMouseDown,
      onMouseMove: this.onMouseMove,
      onMouseUp: this.onMouseUp,
    });
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
  private _onMouseDown: (e: MouseEvent) => void;
  get onMouseDown(): (e: MouseEvent) => void {
    return this._onMouseDown;
  }
  set onMouseDown(prop: ((e: MouseEvent) => void) | undefined) {
    if (this._onMouseDown === prop) return;
    this._onMouseDown = prop ?? function () {};
    this.markNeedsPaint();
  }
  private _onMouseMove: (e: MouseEvent) => void;
  get onMouseMove(): (e: MouseEvent) => void {
    return this._onMouseMove;
  }
  set onMouseMove(prop: ((e: MouseEvent) => void) | undefined) {
    if (this._onMouseMove === prop) return;
    this._onMouseMove = prop ?? function () {};
    this.markNeedsPaint();
  }
  private _onMouseUp: (e: MouseEvent) => void;
  get onMouseUp(): (e: MouseEvent) => void {
    return this._onMouseUp;
  }
  set onMouseUp(prop: ((e: MouseEvent) => void) | undefined) {
    if (this._onMouseUp === prop) return;
    this._onMouseUp = prop ?? function () {};
    this.markNeedsPaint();
  }
  constructor({
    onClick = () => {},
    onMouseDown = () => {},
    onMouseUp = () => {},
    onMouseMove = () => {},
  }: {
    onClick?: () => void;
    onMouseUp?: (e: MouseEvent) => void;
    onMouseMove?: (e: MouseEvent) => void;
    onMouseDown?: (e: MouseEvent) => void;
  }) {
    super({ isPainter: true });
    this._onClick = onClick;
    this._onMouseDown = onMouseDown;
    this._onMouseMove = onMouseMove;
    this._onMouseUp = onMouseUp;
  }

  protected performPaint(
    { rect }: { rect: SVGRectElement },
    { isOnBrowser }: PaintContext
  ): void {
    if (!this.mountedOnBroswer && isOnBrowser) {
      this.mountedOnBroswer = true;
      rect.addEventListener("click", () => this.onClick());
      rect.addEventListener("mousedown", (e: MouseEvent) =>
        this.onMouseDown(e)
      );
      rect.addEventListener("mouseup", (e: MouseEvent) => this.onMouseUp(e));
      rect.addEventListener("mousemove", (e: MouseEvent) =>
        this.onMouseMove(e)
      );
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
