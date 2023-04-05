import InlineSpan from "./InlineSpan";
import { assert, getTextHeight, getTextWidth } from "../../utils";
import { PaintContext } from "../../utils/type";

import {
  TextDirection,
  TextAlign,
  TextWidthBasis,
  TextStyle,
} from "../../type";
import { FontStyle } from "./TextStyle";

const defaultTextStyle = {
  fontFamily: "serif",
  fontSize: 16,
  fontWeight: "normal",
  fontColor: "black",
};

export default class TextPainter {
  text?: InlineSpan;
  textAlign: TextAlign;
  textDirection?: TextDirection;
  ellipsis?: string;
  textScaleFactor: number;
  maxLines?: number;
  textWidthBasis: TextWidthBasis;

  constructor({
    text,
    textAlign = TextAlign.start,
    textDirection,
    textScaleFactor = 1,
    maxLines,
    ellipsis,
    textWidthBasis = TextWidthBasis.parent,
  }: {
    text?: InlineSpan;
    textAlign?: TextAlign;
    textDirection?: TextDirection;
    softWrap?: boolean;
    textScaleFactor?: number;
    maxLines?: number;
    textWidthBasis?: TextWidthBasis;
    ellipsis?: string;
  }) {
    this.text = text;
    this.textAlign = textAlign;
    this.textDirection = textDirection;
    this.textScaleFactor = textScaleFactor;
    this.maxLines = maxLines;
    this.ellipsis = ellipsis;
    this.textWidthBasis = textWidthBasis;
  }

  get plainText(): string {
    return this.text?.toPlainText() || "";
  }

  paragraph?: Paragraph;

  paint(textEl: SVGTextElement, { createSvgEl }: PaintContext) {
    this.resetText(textEl);
    assert(this.paragraph != null);

    this.paragraph!.texts.forEach(
      ({ offset, fontFamily, content, fontSize, fontWeight, color }) => {
        const tspanEl = createSvgEl("tspan");
        tspanEl.setAttribute("x", `${offset.x}`);
        tspanEl.setAttribute("y", `${offset.y}`);
        tspanEl.setAttribute("text-anchor", "start");
        tspanEl.setAttribute("alignment-baseline", "text-before-edge");
        tspanEl.setAttribute("fill", color);
        tspanEl.setAttribute("font-size", `${fontSize}`);
        tspanEl.setAttribute("font-family", `${fontFamily}`);
        tspanEl.setAttribute("font-weight", fontWeight);
        tspanEl.textContent = content;
        textEl.appendChild(tspanEl);
      }
    );
  }

  private createParagraph(text?: InlineSpan): Paragraph {
    return new Paragraph(text);
  }

  private resetText(textEl: SVGTextElement) {
    while (textEl.firstChild) {
      textEl.removeChild(textEl.firstChild);
    }
  }

  layout({
    minWidth = 0,
    maxWidth = Infinity,
  }: {
    minWidth?: number;
    maxWidth?: number;
  }) {
    this.paragraph = this.createParagraph(this.text);
    this.layoutParagraph({ minWidth, maxWidth });
  }

  layoutParagraph({
    minWidth = 0,
    maxWidth = Infinity,
  }: {
    minWidth?: number;
    maxWidth?: number;
  }) {
    this.paragraph!.layout({ minWidth, maxWidth });
  }
}

export class Paragraph {
  texts: {
    fontSize: number;
    fontFamily: string;
    content: string;
    fontWeight: string;
    height: number;
    offset: { x: number; y: number };
    color: string;
    fontStyle: FontStyle;
  }[] = [];
  constructor(source?: InlineSpan) {
    if (!source) return;
    source.build(this);
  }

  layout({
    minWidth = 0,
    maxWidth = Infinity,
  }: {
    minWidth?: number;
    maxWidth?: number;
  }) {
    const temp = this.texts;
    this.texts = [];
  }

  addText({
    fontFamily = defaultTextStyle.fontFamily,
    fontSize = defaultTextStyle.fontSize,
    fontWeight = defaultTextStyle.fontWeight,
    content = "",
    offset = { x: 0, y: 0 },
    height = 1.2,
    fontStyle = FontStyle.normal,
    color = defaultTextStyle.fontColor,
  }: {
    fontSize?: number;
    fontFamily?: string;
    content?: string;
    fontStyle?: FontStyle;
    fontWeight?: string;
    offset?: { x: number; y: number };
    color?: string;
    height?: number;
  }) {
    this.texts.push({
      height,
      fontFamily,
      fontSize,
      fontWeight,
      content,
      offset,
      color,
      fontStyle,
    });
  }
}
