import { RenderObjectElement } from "../../element";
import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject";
import { assert, createUniqueId } from "../../utils";
import type { PaintContext } from "../../utils/type";
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget";
import type Widget from "../../widget/Widget";

type Cursor =
  | "pointer"
  | "default"
  | "move"
  | "text"
  | "wait"
  | "help"
  | "progress"
  | "not-allowed"
  | "crosshair"
  | "grab"
  | "grabbing"
  | "e-resize"
  | "ne-resize"
  | "nw-resize"
  | "n-resize"
  | "se-resize"
  | "sw-resize"
  | "s-resize"
  | "w-resize"
  | "ew-resize"
  | "ns-resize"
  | "nesw-resize"
  | "nwse-resize"
  | "col-resize"
  | "row-resize"
  | "all-scroll";

let globalDragBackend: DragBackend;
let backendRefCount = 0;
function getSingletonDragBackend(): DragBackend {
  if (globalDragBackend == null) {
    globalDragBackend = new DragBackend();
  }

  return globalDragBackend;
}

type Bubble = {
  click: boolean;
  mousedown: boolean;
  mouseup: boolean;
  mousemove: boolean;
  mouseover: boolean;
  mouseenter: boolean;
  mouseleave: boolean;
};

class BaseGestureDetector extends SingleChildRenderObjectWidget {
  onClick: (e: MouseEvent) => void;
  onMouseUp: (e: MouseEvent) => void;
  onMouseMove: (e: MouseEvent) => void;
  onMouseDown: (e: MouseEvent) => void;
  onMouseOver: (e: MouseEvent) => void;
  onMouseEnter: (e: MouseEvent) => void;
  onMouseLeave: (e: MouseEvent) => void;
  onDragStart: (e: MouseEvent) => void;
  onDragMove: (e: MouseEvent) => void;
  onDragEnd: (e: MouseEvent) => void;
  cursor: Cursor;
  bubble: Bubble;
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
    onDragEnd,
    onDragMove,
    onDragStart,
    bubble = {},
  }: {
    child?: Widget;
    onClick?: (e: MouseEvent) => void;
    onMouseUp?: (e: MouseEvent) => void;
    onMouseMove?: (e: MouseEvent) => void;
    onMouseDown?: (e: MouseEvent) => void;
    onMouseOver?: (e: MouseEvent) => void;
    onMouseEnter?: (e: MouseEvent) => void;
    onMouseLeave?: (e: MouseEvent) => void;
    onDragStart?: (e: MouseEvent) => void;
    onDragMove?: (e: MouseEvent) => void;
    onDragEnd?: (e: MouseEvent) => void;
    cursor?: Cursor;
    key?: any;
    bubble?: Partial<Bubble>;
  }) {
    super({ child, key });
    this.onClick = onClick ?? emptyCallback;
    this.onMouseDown = onMouseDown ?? emptyCallback;
    this.onMouseMove = onMouseMove ?? emptyCallback;
    this.onMouseUp = onMouseUp ?? emptyCallback;
    this.onMouseOver = onMouseOver ?? emptyCallback;
    this.onMouseEnter = onMouseEnter ?? emptyCallback;
    this.onMouseLeave = onMouseLeave ?? emptyCallback;
    this.onDragStart = onDragStart ?? emptyCallback;
    this.onDragMove = onDragMove ?? emptyCallback;
    this.onDragEnd = onDragEnd ?? emptyCallback;
    this.cursor = cursor ?? "pointer";
    this.bubble = {
      mousedown: false,
      mouseenter: false,
      mouseleave: false,
      mousemove: false,
      mouseover: false,
      mouseup: false,
      click: false,
      ...bubble,
    };
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
      onDragStart: this.onDragStart,
      onDragMove: this.onDragMove,
      onDragEnd: this.onDragEnd,
      cursor: this.cursor,
      bubble: this.bubble,
    });
  }

  updateRenderObject(renderObject: RenderGestureDetector): void {
    renderObject.onClick = this.onClick;
    renderObject.onMouseOver = this.onMouseOver;
    renderObject.cursor = this.cursor;
    renderObject.onMouseEnter = this.onMouseEnter;
    renderObject.onMouseLeave = this.onMouseLeave;
    renderObject.onDragStart = this.onDragStart;
    renderObject.onDragMove = this.onDragMove;
    renderObject.onDragEnd = this.onDragEnd;
    renderObject.bubble = this.bubble;
  }
}

class RenderGestureDetector extends SingleChildRenderObject {
  private id = createUniqueId();
  private _bubble: Bubble;
  get bubble(): Bubble {
    return this._bubble;
  }
  set bubble(prop: Bubble) {
    this._bubble = prop;
  }
  private _cursor: Cursor;
  get cursor(): Cursor {
    return this._cursor;
  }
  set cursor(prop: Cursor) {
    if (this._cursor === prop) return;
    this._cursor = prop;
    this.markNeedsPaint();
  }
  private _onClick: MouseEventCallback;
  get onClick() {
    return this._onClick;
  }
  set onClick(prop) {
    if (this.onClick === prop) return;
    this._onClick = prop;
  }
  private _onMouseDown: MouseEventCallback;
  get onMouseDown(): MouseEventCallback {
    return this._onMouseDown;
  }
  set onMouseDown(prop: MouseEventCallback) {
    if (this._onMouseDown === prop) return;
    this._onMouseDown = prop;
  }
  private _onMouseMove: MouseEventCallback;
  get onMouseMove(): MouseEventCallback {
    return this._onMouseMove;
  }
  set onMouseMove(prop: MouseEventCallback) {
    if (this._onMouseMove === prop) return;
    this._onMouseMove = prop;
  }
  private _onMouseUp: MouseEventCallback;
  get onMouseUp(): MouseEventCallback {
    return this._onMouseUp;
  }
  set onMouseUp(prop: MouseEventCallback) {
    if (this._onMouseUp === prop) return;
    this._onMouseUp = prop;
  }
  private _onMouseOver: MouseEventCallback;
  get onMouseOver(): MouseEventCallback {
    return this._onMouseOver;
  }
  set onMouseOver(prop: MouseEventCallback) {
    if (this._onMouseOver === prop) return;
    this._onMouseOver = prop;
  }
  private _onMouseEnter: MouseEventCallback;
  get onMouseEnter(): MouseEventCallback {
    return this._onMouseEnter;
  }
  set onMouseEnter(prop: MouseEventCallback) {
    if (this._onMouseEnter === prop) return;
    this._onMouseEnter = prop;
  }
  private _onMouseLeave: MouseEventCallback;
  get onMouseLeave(): MouseEventCallback {
    return this._onMouseLeave;
  }
  set onMouseLeave(prop: MouseEventCallback) {
    if (this._onMouseLeave === prop) return;
    this._onMouseLeave = prop;
  }
  private _onDragStart: MouseEventCallback;
  get onDragStart(): MouseEventCallback {
    return this._onDragStart;
  }
  set onDragStart(prop: MouseEventCallback) {
    if (this._onDragStart === prop) return;
    this._onDragStart = prop;
  }
  private _onDragMove: MouseEventCallback;
  get onDragMove(): MouseEventCallback {
    return this._onDragMove;
  }
  set onDragMove(prop: MouseEventCallback) {
    if (this._onDragMove === prop) return;
    this._onDragMove = prop;
  }
  private _onDragEnd: MouseEventCallback;
  get onDragEnd(): MouseEventCallback {
    return this._onDragEnd;
  }
  set onDragEnd(prop: MouseEventCallback) {
    if (this._onDragEnd === prop) return;
    this._onDragEnd = prop;
  }

  constructor({
    onClick,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    onMouseOver,
    onMouseEnter,
    onMouseLeave,
    onDragEnd,
    onDragMove,
    onDragStart,
    cursor,
    bubble,
  }: {
    onClick: MouseEventCallback;
    onMouseUp: MouseEventCallback;
    onMouseMove: MouseEventCallback;
    onMouseDown: MouseEventCallback;
    onMouseOver: MouseEventCallback;
    onMouseLeave: MouseEventCallback;
    onMouseEnter: MouseEventCallback;
    onDragStart: MouseEventCallback;
    onDragMove: MouseEventCallback;
    onDragEnd: MouseEventCallback;
    cursor: Cursor;
    bubble: Bubble;
  }) {
    super({ isPainter: true });
    this._onClick = onClick;
    this._onMouseDown = onMouseDown;
    this._onMouseMove = onMouseMove;
    this._onMouseUp = onMouseUp;
    this._onMouseOver = onMouseOver;
    this._onMouseEnter = onMouseEnter;
    this._onMouseLeave = onMouseLeave;
    this._onDragEnd = onDragEnd;
    this._onDragMove = onDragMove;
    this._onDragStart = onDragStart;
    this._cursor = cursor;
    this._bubble = bubble;
  }
  private get listeners() {
    return {
      click: this.onClick,
      mousedown: this.onMouseDown,
      mousemove: this.onMouseMove,
      mouseup: this.onMouseUp,
      mouseover: this.onMouseOver,
      mouseenter: this.onMouseEnter,
      mouseleave: this.onMouseLeave,
    };
  }

  attach(ownerElement: RenderObjectElement): void {
    super.attach(ownerElement);
    this.addEventListeners();
    this.addEventBubbleListeners();
  }

  dispose(context: PaintContext): void {
    this.removeEventListeners();
    backendRefCount--;
    if (backendRefCount === 0) {
      getSingletonDragBackend().teardown();
      globalDragBackend = null;
    }
    super.dispose(context);
  }

  private removeEventListeners() {
    getSingletonDragBackend().disconnectDragSource(this.id);
  }

  private addEventListeners() {
    const isBrowser = typeof window !== "undefined";
    if (!isBrowser) return;

    const {
      svgEls: { rect },
    } = this.resolveSvgEl();

    const dragBackend = getSingletonDragBackend();
    dragBackend.isSetup || dragBackend.setup();
    backendRefCount++;

    dragBackend.connectDragSource(this.id, rect, {
      onDragStart: this.onDragStart,
      onDragMove: this.onDragMove,
      onDragEnd: this.onDragEnd,
    });

    rect.addEventListener("click", this.onClick);
    rect.addEventListener("mousedown", this.onMouseDown);
    rect.addEventListener("mouseup", this.onMouseUp);
    rect.addEventListener("mousemove", this.onMouseMove);
    rect.addEventListener("mouseover", this.onMouseOver);
    rect.addEventListener("mouseenter", this.onMouseEnter);
    rect.addEventListener("mouseleave", this.onMouseLeave);
  }

  protected performPaint({ rect }: { rect: SVGRectElement }): void {
    rect.setAttribute("width", `${this.size.width}`);
    rect.setAttribute("height", `${this.size.height}`);
    rect.setAttribute("cursor", this.cursor);
    rect.setAttribute("pointer-events", "auto");
    rect.setAttribute("fill", "transparent");
  }

  createDefaultSvgEl({ createSvgEl }: PaintContext) {
    const rect = createSvgEl("rect");
    return {
      rect,
    };
  }

  dispatch(e: Event) {
    this.listeners[e.type]?.(e);
  }

  dispatchParent(e: Event) {
    let parent = this.parent;

    while (parent != null) {
      if (parent instanceof RenderGestureDetector) {
        parent.dispatch(e);
      }
      parent = parent.parent;
    }
  }

  private addEventBubbleListeners() {
    const {
      svgEls: { rect },
    } = this.resolveSvgEl();

    rect.addEventListener("click", (e) => {
      if (!this.bubble.click) return;
      this.dispatchParent(e);
    });
    rect.addEventListener("mousedown", (e) => {
      if (!this.bubble.mousedown) return;
      this.dispatchParent(e);
    });
    rect.addEventListener("mouseup", (e) => {
      if (!this.bubble.mouseup) return;
      this.dispatchParent(e);
    });
    rect.addEventListener("mousemove", (e) => {
      if (!this.bubble.mousemove) return;
      this.dispatchParent(e);
    });
    rect.addEventListener("mouseover", (e) => {
      if (!this.bubble.mouseover) return;
      this.dispatchParent(e);
    });
    rect.addEventListener("mouseenter", (e) => {
      if (!this.bubble.mouseenter) return;
      this.dispatchParent(e);
    });
    rect.addEventListener("mouseleave", (e) => {
      if (!this.bubble.mouseleave) return;
      this.dispatchParent(e);
    });
  }
}

type MouseEventCallback = (event: MouseEvent) => void;

function emptyCallback(arg?: any) {}

type SourceId = string;

class DragBackend {
  isSetup = false;
  private activeDragSourceId: string | null = null;
  get root(): Document {
    assert(
      typeof document !== "undefined",
      "DragBackend requires document. please use DragBackend in browser environment."
    );
    return document;
  }
  private dragStartListener: Record<SourceId, (e: MouseEvent) => void> = {};
  private dragMoveListener: Record<SourceId, (e: MouseEvent) => void> = {};
  private dragEndListener: Record<SourceId, (e: MouseEvent) => void> = {};

  constructor() {}

  setup() {
    if (typeof window === "undefined") return;
    if (this.isSetup) return;
    this.root.addEventListener("mousemove", this.handleMouseMoveTop.bind(this));
    this.root.addEventListener("mouseup", this.handleMouseUpTop.bind(this));
  }

  teardown() {
    if (typeof window === "undefined") return;
    this.root.removeEventListener("mousemove", this.handleMouseMoveTop);
    this.root.removeEventListener("mouseup", this.handleMouseUpTop);
  }

  private handleMouseMoveTop(e: MouseEvent) {
    if (this.activeDragSourceId == null) return;
    this.dragMoveListener[this.activeDragSourceId]?.(e);
  }

  private handleMouseUpTop(e: MouseEvent) {
    if (this.activeDragSourceId == null) return;
    this.dragEndListener[this.activeDragSourceId]?.(e);
  }

  public connectDragSource(
    sourceId: string,
    node: SVGElement,
    {
      onDragStart = emptyCallback,
      onDragMove = emptyCallback,
      onDragEnd = emptyCallback,
    }: {
      onDragStart?: (e: MouseEvent) => void;
      onDragMove?: (e: MouseEvent) => void;
      onDragEnd?: (e: MouseEvent) => void;
    } = {}
  ) {
    this.dragStartListener[sourceId] = (e) => {
      this.activeDragSourceId = sourceId;
      onDragStart(e);
    };
    node.addEventListener(
      "mousedown",
      this.dragStartListener[sourceId].bind(this)
    );
    this.dragMoveListener[sourceId] = (e) => {
      onDragMove(e);
    };
    this.dragEndListener[sourceId] = (e) => {
      this.activeDragSourceId = null;
      onDragEnd(e);
    };
  }

  public disconnectDragSource(sourceId: string) {
    delete this.dragMoveListener[sourceId];
    delete this.dragEndListener[sourceId];
  }
}

export default BaseGestureDetector;
