import RenderObject from "../renderobject/RenderObject"
import { getTextHeight, getTextWidth } from "../utils/caculator"
import type Constraint from "../utils/constraint"
import Size from "../utils/size"
import type { PaintContext } from "../utils/type"
import RenderObjectWidget from "../widget/RenderObjectWidget"

type TextProps = {
  text: string
  style: {
    fontFamily?: string
    fontSize?: string
    fontWeight?: string
  }
}

class Text extends RenderObjectWidget {
  text: string
  font: string
  constructor({
    text,
    style: { fontFamily = 'serif', fontSize = '16px', fontWeight = 'normal' },
  }: TextProps) {
    super({ children: [] })
    this.text = text
    this.font = `${fontWeight} ${fontSize} ${fontFamily}`
  }

  createRenderObject(): RenderObject {
    return new RenderText({ text: this.text, font: this.font })
  }
}

class RenderText extends RenderObject {
  text: string
  font: string
  constructor({ text, font }: { text: string; font: string }) {
    super()
    this.text = text
    this.font = font
  }

  protected performPaint(context: PaintContext): void {
    const { ctx } = context
    ctx.font = this.font
    ctx.textBaseline = 'top'
    ctx.fillText(this.text, 0, 1)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected preformLayout(constraint: Constraint): void {
    const size = new Size({
      width: getTextWidth({ text: this.text, font: this.font }),
      height: getTextHeight({ text: this.text, font: this.font }),
    })

    this.size = constraint.constrain(size)
  }
}

export default Text
