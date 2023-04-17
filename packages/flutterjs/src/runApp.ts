import type RenderObjectElement from "./element/RenderObjectElement";
import { Size, Offset, Constraints } from "./type";
import type { PaintContext } from "./utils/type";
import RenderObjectToWidgetAdapter from "./widget/RenderObjectToWidgetAdapter";
import type Widget from "./widget/Widget";

type AppRunnerProps = {
  document?: Document;
  window?: Window;
  view: SVGSVGElement;
  ssrSize?: { width: number; height: number };
};

export class AppRunner {
  root!: RenderObjectElement;
  owner: Owner;
  viewSize: { width: number; height: number };
  constructor({
    view,
    document: _document = document,
    window: _window = window,
    ssrSize = Size.zero,
  }: AppRunnerProps) {
    this.viewSize = ssrSize;
    this.owner = new Owner({ view, document: _document, window: _window });
  }

  runApp(widget: Widget): string {
    this.root = new RenderObjectToWidgetAdapter({
      app: widget,
    }).createElement();
    this.root.mount(undefined);
    this.draw();
    return this.owner.view.innerHTML;
  }

  setConfig({
    document,
    window,
    view,
  }: {
    document?: Document;
    window?: Window;
    view?: SVGSVGElement;
  }) {
    if (document) this.owner.document = document;
    if (window) this.owner.window = window;
    if (view) this.owner.view = view;
  }

  onMount({
    view,
    resizeTarget: resizeTarget,
  }: {
    view?: SVGSVGElement;
    resizeTarget?: HTMLElement;
  }) {
    if (view) this.owner.view = view;
    this.owner.window = window;
    this.owner.document = document;
    resizeTarget && this.observeCanvasSize(resizeTarget);
  }

  observeCanvasSize(target: HTMLElement) {
    const resize = (child: ResizeObserverEntry) => {
      const { width, height } = child.target.getBoundingClientRect();
      this.owner.view.setAttribute("width", `${width}`);
      this.owner.view.setAttribute("height", `${height}`);
      this.viewSize = new Size({ width, height });
    };
    const resizeObserver = new ResizeObserver((entries) => {
      const child = entries[0];
      resize(child);
      this.draw();
    });
    resizeObserver.observe(target);
  }

  draw() {
    if (this.viewSize.width === 0 || this.viewSize.height === 0) return;
    this.layout();
    this.paint();
  }

  rebuild() {
    this.root.children[0].rebuild();
  }

  layout() {
    const rootRenderObject = this.root.renderObject;
    rootRenderObject.layout(Constraints.tight(this.viewSize));
  }

  paint() {
    const rootRenderObject = this.root.renderObject;
    rootRenderObject.paint(this.owner.paintContext);
  }
}

export class Owner {
  document: Document;
  window: Window;
  view: SVGSVGElement;
  constructor({
    document,
    window,
    view,
  }: {
    document: Document;
    window: Window;
    view: SVGSVGElement;
  }) {
    this.document = document;
    this.window = window;
    this.view = view;
  }

  setConfig({
    document,
    window,
    view,
  }: {
    document: Document;
    window: Window;
    view: SVGSVGElement;
  }) {
    this.document = document;
    this.window = window;
    this.view = view;
  }
  get paintContext(): PaintContext {
    const { document: _document, view } = this;
    return {
      createSvgEl(tagName) {
        const el = _document.createElementNS(
          "http://www.w3.org/2000/svg",
          tagName
        ) as unknown as SVGElement;
        return el;
      },
      setId(el, id) {
        el.setAttribute("data-render-id", id);
      },
      appendSvgEl(el) {
        view.appendChild(el);
      },
      findSvgEl(id: string) {
        return view.querySelector(
          `[data-render-id="${id}"]`
        ) as SVGAElement | null;
      },
    };
  }
}
