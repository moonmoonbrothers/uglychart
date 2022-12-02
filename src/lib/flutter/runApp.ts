/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type Element from "./element/Element"
import { Size, Offset, Constraint } from "./type"
import type { PaintContext } from "./utils/type"
import RenderObjectToWidgetAdapter from "./widget/RenderObjectToWidgetAdapter"
import type Widget from "./widget/Widget"

type AppRunnerProps = {
  document?: Document
  window?: Window
  view: SVGSVGElement
  ssrSize?: { width: number; height: number }
}

class AppRunner {
  root!: Element
  owner: Owner
  viewSize: { width: number; height: number }
  constructor({
    view,
    document: _document = document,
    window: _window = window,
    ssrSize  = Size.zero(),
  }: AppRunnerProps) {
    this.viewSize = ssrSize
    this.owner = new Owner({ view, document: _document, window: _window })
  }

  runApp(widget: Widget): string {
    this.root = new RenderObjectToWidgetAdapter({ app: widget }).createElement()
    this.root.mount(undefined)
    this.draw()
    return this.owner.view.innerHTML
  }

  setConfig({
    document,
    window,
    view,
  }: {
    document?: Document
    window?: Window
    view?: SVGSVGElement
  }) {
    if (document) this.owner.document = document
    if (window) this.owner.window = window
    if (view) this.owner.view = view
  }

  onMount({
    view,
    resizeTarget: resizeTarget,
  }: {
    view?: SVGSVGElement
    resizeTarget?: HTMLElement
  }) {
    if (view) this.owner.view = view
    this.owner.window = window
    this.owner.document = document
    resizeTarget && this.observeCanvasSize(resizeTarget)
  }

  observeCanvasSize(target: HTMLElement) {
    const resize = (child: ResizeObserverEntry) => {
      const { width, height } = child.target.getBoundingClientRect()
      const dpr = window.devicePixelRatio
      this.owner.view.setAttribute("width", `${width}`)
      this.owner.view.setAttribute("height", `${height}`)
      this.viewSize = new Size({ width, height })
    }
    const resizeObserver = new ResizeObserver((entries) => {
      const child = entries[0]
      resize(child)
      this.draw()
    })
    resizeObserver.observe(target)
  }

  draw() {
    this.layout()
    this.paint()
  }

  layout() {
    const rootRenderObject = this.root.renderObject
    rootRenderObject.layout(Constraint.tight(this.viewSize))
  }

  paint() {
    const rootRenderObject = this.root.renderObject
    rootRenderObject.paint(this.owner.paintContext, Offset.zero())
  }
}

export class Owner {
  document: Document
  window: Window
  view: SVGSVGElement
  constructor({
    document,
    window,
    view,
  }: {
    document: Document
    window: Window
    view: SVGSVGElement
  }) {
    this.document = document
    this.window = window
    this.view = view
  }

  setConfig({
    document,
    window,
    view,
  }: {
    document: Document
    window: Window
    view: SVGSVGElement
  }) {
    this.document = document
    this.window = window
    this.view = view
  }
  get paintContext(): PaintContext {
    const { document: _document, view } = this
    return {
      createSvgEl(tagName, id: string) {
        const el = _document.createElementNS(
          "http://www.w3.org/2000/svg",
          tagName
        ) as unknown as SVGElement
        el.setAttribute("data-render-id", id)
        return el
      },
      appendSvgEl(el) {
        view.appendChild(el)
      },
      findSvgEl(id: string) {
        return view.querySelector(
          `[data-render-id="${id}"]`
        ) as SVGAElement | null
      },
    }
  }
}

export default AppRunner
