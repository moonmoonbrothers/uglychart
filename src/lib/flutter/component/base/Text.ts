import RenderObject from "../../renderobject/RenderObject"
import { getTextHeight, getTextWidth } from "../../utils/caculator"
import type Constraint from "../../utils/constraint"
import Size from "../../utils/size"
import type { PaintContext } from "../../utils/type"
import RenderObjectWidget from "../../widget/RenderObjectWidget"

export type TextProps = {
  text: string
  style?: {
    fontFamily?: string
    fontSize?: string
    fontWeight?: string
    fontColor?: string
  }
}

class Text extends RenderObjectWidget {
  text: string
  font: string
  fontColor: string
  constructor({
    text,
    style: {
      fontFamily = "serif",
      fontSize = "16px",
      fontWeight = "normal",
      fontColor = "black",
    } = {},
  }: TextProps) {
    super({ children: [] })
    this.text = text
    this.font = `${fontWeight} ${fontSize} ${fontFamily}`
    this.fontColor = fontColor
  }

  createRenderObject(): RenderObject {
    return new RenderText({
      text: this.text,
      font: this.font,
      fillStyle: this.fontColor,
    })
  }
}

class RenderText extends RenderObject {
  text: string
  font: string
  fillStyle: string
  constructor({
    text,
    font,
    fillStyle,
  }: {
    text: string
    font: string
    fillStyle: string
  }) {
    super()
    this.text = text
    this.font = font
    this.fillStyle = fillStyle
  }

  protected performPaint(context: PaintContext): void {
    const { ctx } = context
    ctx.fillStyle = this.fillStyle
    ctx.font = this.font
    ctx.textBaseline = "top"
    ctx.fillText(this.text, 0, 1)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected preformLayout(): void {
    const size = new Size({
      width: getTextWidth({ text: this.text, font: this.font }),
      height: getTextHeight({ text: this.text, font: this.font }),
    })

    this.size = size
  }

  override getIntrinsicHeight(): number {
    return getTextHeight({ text: this.text, font: this.font })
  }

  override getIntrinsicWidth(): number {
    return getTextWidth({ text: this.text, font: this.font })
  }
}

export default Text
