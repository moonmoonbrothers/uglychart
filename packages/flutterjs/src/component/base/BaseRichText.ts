import RenderObject from "../../renderobject/RenderObject";
import {
  TextDirection,
  TextAlign,
  TextWidthBasis,
  TextOverflow,
  Size,
} from "../../type";
import type { PaintContext } from "../../utils/type";
import RenderObjectWidget from "../../widget/RenderObjectWidget";
import InlineSpan from "../../type/_types/InlineSpan";
import TextPainter from "../../type/_types/TextPainter";

export type RichTextProps = {
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
    renderObject.softWrap = this.softWrap;
    renderObject.overflow = this.overflow;
    renderObject.textScaleFactor = this.textScaleFactor;
    renderObject.maxLines = this.maxLines;
    renderObject.textWidthBasis = this.textWidthBasis;
    renderObject.text = this.text;
    renderObject.textAlign = this.textAlign;
    renderObject.textDirection = this.textDirection || TextDirection.ltr;
  }
}

class RenderParagraph extends RenderObject {
  // text: InlineSpan;
  // textAlign: TextAlign;
  // textDirection?: TextDirection;
  softWrap: boolean;
  overflow: TextOverflow;
  // textScaleFactor: number;
  // maxLines?: number;
  // textWidthBasis: TextWidthBasis;
  textPainter: TextPainter;
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
    this.softWrap = softWrap;
    this.overflow = overflow;
    this.textPainter = new TextPainter({
      text,
      textAlign,
      textDirection,
      textScaleFactor,
      maxLines,
      ellipsis: overflow == TextOverflow.ellipsis ? "\u2026" : undefined,
      textWidthBasis,
    });
  }

  get text() {
    return this.textPainter.text!;
  }

  set text(value: InlineSpan) {
    this.textPainter.text = value;
  }

  get textWidthBasis(): TextWidthBasis {
    return this.textPainter.textWidthBasis;
  }

  set textWidthBasis(value: TextWidthBasis) {
    this.textPainter.textWidthBasis = value;
  }

  get textAlign(): TextAlign {
    return this.textPainter.textAlign;
  }

  set textAlign(textAlign: TextAlign) {
    this.textPainter.textAlign = textAlign;
  }

  get textDirection(): TextDirection {
    return this.textPainter.textDirection!;
  }

  set textDirection(direction: TextDirection) {
    this.textPainter.textDirection;
  }

  get textScaleFactor(): number {
    return this.textPainter.textScaleFactor;
  }

  set textScaleFactor(scaleFactor: number) {
    this.textPainter.textScaleFactor = scaleFactor;
  }

  get maxLines(): number | undefined {
    return this.textPainter.maxLines;
  }

  set maxLines(value: number | undefined) {
    this.textPainter.maxLines = value;
  }

  protected performPaint(
    {
      text: textEl,
    }: {
      text: SVGTextElement;
    },
    context: PaintContext
  ): void {
    this.textPainter.paint(textEl, context);
  }

  protected preformLayout(): void {
    this.layoutText({
      maxWidth: this.constraints.maxWidth,
      minWidth: this.constraints.minWidth,
    });

    this.size = this.constraints.constrain(
      new Size({
        width: this.textPainter.width,
        height: this.textPainter.height,
      })
    );
  }

  private layoutText({
    maxWidth = Infinity,
    minWidth = 0,
  }: {
    minWidth?: number;
    maxWidth?: number;
  }) {
    const widthMatters =
      this.softWrap || this.overflow === TextOverflow.ellipsis;
    this.textPainter.layout({
      minWidth: minWidth,
      maxWidth: widthMatters ? maxWidth : Infinity,
    });
  }

  override getIntrinsicHeight(): number {
    this.textPainter.layout();
    return this.textPainter.intrinsicHeight;
  }

  override getIntrinsicWidth(): number {
    this.textPainter.layout();
    return this.textPainter.intrinsicWidth;
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
