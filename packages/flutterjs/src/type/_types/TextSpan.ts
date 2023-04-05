import InlineSpan from "./InlineSpan";
import { Paragraph } from "./TextPainter";
import TextStyle from "./TextStyle";

class TextSpan extends InlineSpan {
  text?: string;
  children: TextSpan[];

  constructor({
    style,
    text,
    children = [],
  }: {
    style?: TextStyle;
    text?: string;
    children?: TextSpan[];
  }) {
    super({ style });
    this.children = children;
    this.text = text;
  }

  visitChildren(visitor: (span: InlineSpan) => void): void {
    visitor(this);
    this.children.forEach((child) => child.visitChildren(visitor));
  }

  protected override computeToPlainText(): string {
    return this.text || "";
  }

  build(
    paragraph: Paragraph,
    parentStyle: TextStyle = this.style ?? new TextStyle()
  ): void {
    const inheritedStyle = parentStyle.merge(this.style);
    const { fontFamily, fontSize, fontStyle, fontWeight, color, height } =
      inheritedStyle;
    paragraph.addText({
      fontFamily,
      fontSize,
      fontWeight,
      fontStyle,
      color,
      height,
      content: this.text,
    });

    this.children.forEach((child) => {
      child.build(paragraph, inheritedStyle);
    });
  }
}

export default TextSpan;
