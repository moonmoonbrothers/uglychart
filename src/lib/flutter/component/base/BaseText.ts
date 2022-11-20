import RenderObject from "../../renderobject/RenderObject"
import { getTextHeight, getTextWidth } from "../../utils/getTextSize"
import { Size } from "../../type"
import type { PaintContext } from "../../utils/type"
import RenderObjectWidget from "../../widget/RenderObjectWidget"

export type TextProps = {
  style?: {
    fontFamily?: string
    fontSize?: string
    fontWeight?: string
    fontColor?: string
  }
  textAlign?: "left" | "right" | "center" | "start" | "end"
  textBaseline?:
    | "top"
    | "hanging"
    | "middle"
    | "alphabetic"
    | "ideographic"
    | "bottom"
}

class Text extends RenderObjectWidget {
  text: string
  font: string
  fontColor: string
  textAlign: "left" | "right" | "center" | "start" | "end"
  textBaseline:
    | "top"
    | "hanging"
    | "middle"
    | "alphabetic"
    | "ideographic"
    | "bottom"
  constructor(
    text: string,
    {
      textAlign = "left",
      textBaseline = "top",
      style: {
        fontFamily = "serif",
        fontSize = "16px",
        fontWeight = "normal",
        fontColor = "black",
      } = {},
    }: TextProps
  ) {
    super({ children: [] })
    this.text = text
    this.font = `${fontWeight} ${fontSize} ${fontFamily}`
    this.fontColor = fontColor
    ;(this.textAlign = textAlign), (this.textBaseline = textBaseline)
  }

  createRenderObject(): RenderObject {
    return new RenderText({
      text: this.text,
      font: this.font,
      fillStyle: this.fontColor,
      textAlign: this.textAlign,
      textBaseline: this.textBaseline,
    })
  }
}

class RenderText extends RenderObject {
  text: string
  font: string
  fillStyle: string
  textBaseline:
    | "top"
    | "hanging"
    | "middle"
    | "alphabetic"
    | "ideographic"
    | "bottom"
  textAlign: "left" | "right" | "center" | "start" | "end"
  constructor({
    text,
    font,
    fillStyle,
    textAlign,
    textBaseline,
  }: {
    text: string
    font: string
    fillStyle: string
    textBaseline:
      | "top"
      | "hanging"
      | "middle"
      | "alphabetic"
      | "ideographic"
      | "bottom"
    textAlign: "left" | "right" | "center" | "start" | "end"
  }) {
    super()
    this.text = text
    this.font = font
    this.fillStyle = fillStyle
    this.textBaseline = textBaseline
    this.textAlign = textAlign
  }

  protected performPaint(context: PaintContext): void {
    const { ctx } = context
    ctx.fillStyle = this.fillStyle
    ctx.font = this.font
    ctx.textAlign = this.textAlign
    ctx.textBaseline = this.textBaseline
    ctx.fillText(this.text, 0, 0)
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
