/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type Element from "./element/Element"
import { Size, Offset, Constraint } from "./type"
import type { PaintContext } from "./utils/type"
import RenderObjectToWidgetAdapter from "./widget/RenderObjectToWidgetAdapter"
import type Widget from "./widget/Widget"

type AppRunnerProps = {
  canvas: HTMLCanvasElement
}

class AppRunner {
  root!: Element
  owner: Owner
  canvasEl: HTMLCanvasElement
  paintContext: PaintContext
  canvasSize: Size = Size.zero()
  constructor({ canvas }: AppRunnerProps) {
    this.owner = new Owner()
    this.canvasEl = canvas
    const ctx = this.canvasEl.getContext("2d")!
    this.paintContext = { ctx }
  }

  runApp(widget: Widget) {
    this.root = new RenderObjectToWidgetAdapter({ app: widget }).createElement()
    this.root.mount(undefined)
    this.observeCanvasSize()
  }

  observeCanvasSize() {
    const resize = (child: ResizeObserverEntry) => {
      const { width, height } = child.target.getBoundingClientRect()
      this.canvasSize = new Size({ width, height })
      const dpr = window.devicePixelRatio
      this.canvasEl.width = width * dpr
      this.canvasEl.height = height * dpr
      this.paintContext.ctx.scale(dpr, dpr)
    }
    const resizeObserver = new ResizeObserver((entries) => {
      const child = entries[0]
      resize(child)
      this.draw()
    })
    resizeObserver.observe(this.canvasEl)
  }

  draw() {
    this.layout()
    this.paint()
  }

  layout() {
    const rootRenderObject = this.root.renderObject
    rootRenderObject.layout(Constraint.tight(this.canvasSize))
  }

  paint() {
    const { ctx } = this.paintContext
    ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
    const rootRenderObject = this.root.renderObject
    rootRenderObject.paint(this.paintContext, Offset.zero())
  }
}

export class Owner {

}

export default AppRunner
