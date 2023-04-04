import { getTextHeight, getTextWidth } from "../../utils";
import RenderObject from "../../renderobject/RenderObject";
import {
  TextDirection,
  TextAlign,
  TextWidthBasis,
  TextOverflow,
} from "../../type";
import type { PaintContext } from "../../utils/type";
import RenderObjectWidget from "../../widget/RenderObjectWidget";
import InlineSpan from "../../type/_types/InlineSpan";

type RichTextProps = {
  text: InlineSpan;
  textAlign?: TextAlign;
  textDirection?: TextDirection;
  softWrap?: boolean;
  overflow?: TextOverflow;
  textScaleFactor?: number;
  maxLines?: number;
  textWidthBasis?: TextWidthBasis;
};

class RichText extends RenderObjectWidget {
  text: InlineSpan;
  textAlign: TextAlign;
  textDirection?: TextDirection;
  softWrap: boolean;
  overflow: TextOverflow;
  textScaleFactor: number;
  maxLines?: number;
  textWidthBasis: TextWidthBasis;
  constructor({
    text,
    textAlign = TextAlign.start,
    textDirection,
    softWrap = true,
    overflow = TextOverflow.clip,
    textScaleFactor = 1,
    maxLines,
    textWidthBasis = TextWidthBasis.parent,
  }: RichTextProps) {
    super({ children: [] });
    this.text = text;
    this.textAlign = textAlign;
    this.textDirection = textDirection;
    this.softWrap = softWrap;
    this.overflow = overflow;
    this.textScaleFactor = textScaleFactor;
    this.maxLines = maxLines;
    this.textWidthBasis = textWidthBasis;
  }

  createRenderObject(): RenderObject {
    return new RenderParagraph({
      text: this.text,
      textAlign: this.textAlign,
      textDirection: this.textDirection || TextDirection.ltr,
      softWrap: this.softWrap,
      overflow: this.overflow,
      textScaleFactor: this.textScaleFactor,
      maxLines: this.maxLines,
      textWidthBasis: this.textWidthBasis,
    });
  }

  updateRenderObject(renderObject: RenderParagraph): void {
    renderObject.text = this.text;
    renderObject.textAlign = this.textAlign;
    renderObject.textDirection = this.textDirection || TextDirection.ltr;
    renderObject.softWrap = this.softWrap;
    renderObject.overflow = this.overflow;
    renderObject.textScaleFactor = this.textScaleFactor;
    renderObject.maxLines = this.maxLines;
    renderObject.textWidthBasis = this.textWidthBasis;
  }
}

class RenderParagraph extends RenderObject {
  text: InlineSpan;
  textAlign: TextAlign;
  textDirection?: TextDirection;
  softWrap: boolean;
  overflow: TextOverflow;
  textScaleFactor: number;
  maxLines?: number;
  textWidthBasis: TextWidthBasis;
  constructor({
    text,
    textAlign = TextAlign.start,
    textDirection,
    softWrap = true,
    overflow = TextOverflow.clip,
    textScaleFactor = 1,
    maxLines,
    textWidthBasis = TextWidthBasis.parent,
  }: RichTextProps) {
    super({ isPainter: true });
    this.text = text;
    this.textAlign = textAlign;
    this.textDirection = textDirection;
    this.softWrap = softWrap;
    this.overflow = overflow;
    this.textScaleFactor = textScaleFactor;
    this.maxLines = maxLines;
    this.textWidthBasis = textWidthBasis;
  }
  get font(): string {
    const { fontWeight, fontSize, fontFamily } = this.style;
    return `${fontWeight} ${fontSize} ${fontFamily}`;
  }

  protected performPaint({
    text: textEl,
  }: {
    [key: string]: SVGElement;
  }): void {
    // textEl.setAttribute("id", this.id);
    // textEl.setAttribute("text-anchor", this.textAlign);
    // textEl.setAttribute("alignment-baseline", this.textBaseline);
    // textEl.setAttribute("fill", fontColor);
    // textEl.setAttribute("font-size", fontSize);
    // textEl.setAttribute("font-family", fontFamily);
    // textEl.setAttribute("font-weight", fontWeight);
    // textEl.textContent = this.text;
  }

  protected preformLayout(): void {
    // const size = new Size({
    //   width: getTextWidth({ text: this.text, font: this.font }),
    //   height: getTextHeight({ text: this.text, font: this.font }),
    // });
    // this.size = size;
  }

  override getIntrinsicHeight(width: number): number {
    // return getTextHeight({ text: this.text, font: this.font });
    return 0
  }

  override getIntrinsicWidth(height: number): number {
    // return getTextWidth({ text: this.text, font: this.font });
    return 0
  }

  createDefaultSvgEl({ createSvgEl }: PaintContext): {
    [key: string]: SVGElement;
  } {
    return {
      text: createSvgEl("text"),
    };
  }
}

export default RichText;
