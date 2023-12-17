import { RenderObjectElement } from "../../element";
import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject";
import type { PaintContext } from "../../utils/type";
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget";
import type Widget from "../../widget/Widget";

type Cursor = "pointer" | "default";

class BaseGestureDetector extends SingleChildRenderObjectWidget {
  onClick: () => void;
  onMouseUp: (e: MouseEvent) => void;
  onMouseMove: (e: MouseEvent) => void;
  onMouseDown: (e: MouseEvent) => void;
  onMouseOver: (e: MouseEvent) => void;
  onMouseEnter: (e: MouseEvent) => void;
  onMouseLeave: (e: MouseEvent) => void;
  cursor: Cursor;
  constructor({
    child,
    onClick,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseOver,
    onMouseEnter,
    onMouseLeave,
    key,
    cursor,
  }: {
    child?: Widget;
    onClick?: () => void;
    onMouseUp?: (e: MouseEvent) => void;
    onMouseMove?: (e: MouseEvent) => void;
    onMouseDown?: (e: MouseEvent) => void;
    onMouseOver?: (e: MouseEvent) => void;
    onMouseEnter?: (e: MouseEvent) => void;
    onMouseLeave?: (e: MouseEvent) => void;
    cursor?: Cursor;
    key?: any;
  }) {
    super({ child, key });
    this.onClick = onClick ?? emptyCallback;
    this.onMouseDown = onMouseDown ?? emptyCallback;
    this.onMouseMove = onMouseMove ?? emptyCallback;
    this.onMouseUp = onMouseUp ?? emptyCallback;
    this.onMouseOver = onMouseOver ?? emptyCallback;
    this.onMouseEnter = onMouseEnter ?? emptyCallback;
    this.onMouseLeave = onMouseLeave ?? emptyCallback;
    this.cursor = cursor ?? "pointer";
  }

  override createRenderObject(): RenderGestureDetector {
    return new RenderGestureDetector({
      onClick: this.onClick,
      onMouseDown: this.onMouseDown,
      onMouseMove: this.onMouseMove,
      onMouseUp: this.onMouseUp,
      onMouseOver: this.onMouseOver,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      cursor: this.cursor,
    });
  }

  updateRenderObject(renderObject: RenderGestureDetector): void {
    renderObject.onClick = this.onClick;
    renderObject.onMouseOver = this.onMouseOver;
    renderObject.cursor = this.cursor;
    renderObject.onMouseEnter = this.onMouseEnter;
    renderObject.onMouseLeave = this.onMouseLeave;
  }
}

class RenderGestureDetector extends SingleChildRenderObject {
  private mountedOnBrowser: boolean = false;
  private _cursor: Cursor;
  get cursor(): Cursor {
    return this._cursor;
  }
  set cursor(prop: Cursor) {
    if (this._cursor === prop) return;
    this._cursor = prop;
    this.markNeedsPaint();
  }
  private _onClick: () => void;
  get onClick(): () => void {
    return this._onClick;
  }
  set onClick(prop: () => void) {
    if (this.onClick === prop) return;
    this._onClick = prop;
    this.markNeedsPaint();
  }
  private _onMouseDown: MouseEventCallback;
  get onMouseDown(): MouseEventCallback {
    return this._onMouseDown;
  }
  set onMouseDown(prop: MouseEventCallback) {
    if (this._onMouseDown === prop) return;
    this._onMouseDown = prop;
    this.markNeedsPaint();
  }
  private _onMouseMove: MouseEventCallback;
  get onMouseMove(): MouseEventCallback {
    return this._onMouseMove;
  }
  set onMouseMove(prop: MouseEventCallback) {
    if (this._onMouseMove === prop) return;
    this._onMouseMove = prop;
    this.markNeedsPaint();
  }
  private _onMouseUp: MouseEventCallback;
  get onMouseUp(): MouseEventCallback {
    return this._onMouseUp;
  }
  set onMouseUp(prop: MouseEventCallback) {
    if (this._onMouseUp === prop) return;
    this._onMouseUp = prop;
    this.markNeedsPaint();
  }
  private _onMouseOver: MouseEventCallback;
  get onMouseOver(): MouseEventCallback {
    return this._onMouseOver;
  }
  set onMouseOver(prop: MouseEventCallback) {
    if (this._onMouseOver === prop) return;
    this._onMouseOver = prop;
    this.markNeedsPaint();
  }
  private _onMouseEnter: MouseEventCallback;
  get onMouseEnter(): MouseEventCallback {
    return this._onMouseEnter;
  }
  set onMouseEnter(prop: MouseEventCallback) {
    if (this._onMouseEnter === prop) return;
    this._onMouseEnter = prop;
    this.markNeedsPaint();
  }
  private _onMouseLeave: MouseEventCallback;
  get onMouseLeave(): MouseEventCallback {
    return this._onMouseLeave;
  }
  set onMouseLeave(prop: MouseEventCallback) {
    if (this._onMouseLeave === prop) return;
    this._onMouseLeave = prop;
    this.markNeedsPaint();
  }
  constructor({
    onClick,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    onMouseOver,
    onMouseEnter,
    onMouseLeave,
    cursor,
  }: {
    onClick: () => void;
    onMouseUp: MouseEventCallback;
    onMouseMove: MouseEventCallback;
    onMouseDown: MouseEventCallback;
    onMouseOver: MouseEventCallback;
    onMouseLeave: MouseEventCallback;
    onMouseEnter: MouseEventCallback;
    cursor: Cursor;
  }) {
    super({ isPainter: true });
    this._onClick = onClick;
    this._onMouseDown = onMouseDown;
    this._onMouseMove = onMouseMove;
    this._onMouseUp = onMouseUp;
    this._onMouseOver = onMouseOver;
    this._onMouseEnter = onMouseEnter;
    this._onMouseLeave = onMouseLeave;
    this._cursor = cursor;
  }

  protected performPaint(
    { rect }: { rect: SVGRectElement },
    { isOnBrowser }: PaintContext
  ): void {
    if (!this.mountedOnBrowser && isOnBrowser) {
      this.mountedOnBrowser = true;
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
      rect.addEventListener("mouseenter", (e: MouseEvent) =>
        this.onMouseEnter(e)
      );
      rect.addEventListener("mouseleave", (e: MouseEvent) =>
        this.onMouseLeave(e)
      );
    }
    rect.setAttribute("width", `${this.size.width}`);
    rect.setAttribute("height", `${this.size.height}`);
  }

  createDefaultSvgEl({ createSvgEl }: PaintContext) {
    const rect = createSvgEl("rect");
    rect.setAttribute("pointer-events", "auto");
    rect.setAttribute("cursor", this.cursor);
    rect.setAttribute("fill", "transparent");
    return {
      rect,
    };
  }
}

type MouseEventCallback = (event: MouseEvent) => void;
function emptyCallback() {}

export default BaseGestureDetector;
