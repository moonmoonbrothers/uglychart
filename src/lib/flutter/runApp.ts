/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type Element from "./element/Element"
import Size from "./utils/size"
import type { PaintContext } from "./utils/type"
import type Widget from "./widget/Widget"

type AppRunnerProps = {
  canvas: HTMLCanvasElement
}

class AppRunner {
  root!: Element
  paintContext: PaintContext
  canvasSize: Size
  constructor({ canvas }: AppRunnerProps) {
    this.paintContext = {
      ctx: canvas.getContext("2d")!,
    }
    const { width, height } = canvas.getBoundingClientRect()
    this.canvasSize = new Size({ width, height })
  }

  runApp(widget: Widget) {
    this.root = widget.createElement()
    this.layout()
    this.paint()
  }

  layout() {
    console.log()
  }

  paint() {
    console.log()
  }
}

export default AppRunner
