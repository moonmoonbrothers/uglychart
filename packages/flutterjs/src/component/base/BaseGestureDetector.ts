import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject";
import type { PaintContext } from "../../utils/type";
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget";
import type Widget from "../../widget/Widget";

class BaseGestureDetector extends SingleChildRenderObjectWidget {
  onClick: () => void;
  onMouseUp: (e: MouseEvent) => void;
  onMouseMove: (e: MouseEvent) => void;
  onMouseDown: (e: MouseEvent) => void;
  onMouseOver: (e: MouseEvent) => void;
  constructor({
    child,
    onClick,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseOver,
    key,
  }: {
    child?: Widget;
    onClick?: () => void;
    onMouseUp?: (e: MouseEvent) => void;
    onMouseMove?: (e: MouseEvent) => void;
    onMouseDown?: (e: MouseEvent) => void;
    onMouseOver?: (e: MouseEvent) => void;
    key?: any;
  }) {
    super({ child, key });
    this.onClick = onClick ?? emptyCallback;
    this.onMouseDown = onMouseDown ?? emptyCallback;
    this.onMouseMove = onMouseMove ?? emptyCallback;
    this.onMouseUp = onMouseUp ?? emptyCallback;
    this.onMouseOver = onMouseOver ?? emptyCallback;
  }

  override createRenderObject(): RenderGestureDetector {
    return new RenderGestureDetector({
      onClick: this.onClick,
      onMouseDown: this.onMouseDown,
      onMouseMove: this.onMouseMove,
      onMouseUp: this.onMouseUp,
      onMouseOver: this.onMouseOver,
    });
  }

  updateRenderObject(renderObject: RenderGestureDetector): void {
    renderObject.onClick = this.onClick;
    renderObject.onMouseOver = this.onMouseOver;
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
    this.markNeedsPaint();
  }
  private _onMouseDown: (e: MouseEvent) => void;
  get onMouseDown(): (e: MouseEvent) => void {
    return this._onMouseDown;
  }
  set onMouseDown(prop: ((e: MouseEvent) => void) | undefined) {
    if (this._onMouseDown === prop) return;
    this.markNeedsPaint();
  }
  private _onMouseMove: (e: MouseEvent) => void;
  get onMouseMove(): (e: MouseEvent) => void {
    return this._onMouseMove;
  }
  set onMouseMove(prop: ((e: MouseEvent) => void) | undefined) {
    if (this._onMouseMove === prop) return;
    this.markNeedsPaint();
  }
  private _onMouseUp: (e: MouseEvent) => void;
  get onMouseUp(): (e: MouseEvent) => void {
    return this._onMouseUp;
  }
  set onMouseUp(prop: ((e: MouseEvent) => void) | undefined) {
    if (this._onMouseUp === prop) return;
    this.markNeedsPaint();
  }
  private _onMouseOver: (e: MouseEvent) => void;
  get onMouseOver(): (e: MouseEvent) => void {
    return this._onMouseOver;
  }
  set onMouseOver(prop: ((e: MouseEvent) => void) | undefined) {
    if (this._onMouseUp === prop) return;
    this.markNeedsPaint();
  }
  constructor({
    onClick,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    onMouseOver,
  }: {
    onClick: () => void;
    onMouseUp: (e: MouseEvent) => void;
    onMouseMove: (e: MouseEvent) => void;
    onMouseDown: (e: MouseEvent) => void;
    onMouseOver: (e: MouseEvent) => void;
  }) {
    super({ isPainter: true });
    this._onClick = onClick;
    this._onMouseDown = onMouseDown;
    this._onMouseMove = onMouseMove;
    this._onMouseUp = onMouseUp;
    this._onMouseOver = onMouseOver;
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
      rect.addEventListener("mouseover", (e: MouseEvent) =>
        this.onMouseOver(e)
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

function emptyCallback() {}

export default BaseGestureDetector;
