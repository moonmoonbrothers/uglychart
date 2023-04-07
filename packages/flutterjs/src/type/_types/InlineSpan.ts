import TextStyle from "./TextStyle";
import { Paragraph } from "./TextPainter";

class InlineSpan {
  style?: TextStyle;

  constructor({ style }: { style?: TextStyle }) {
    this.style = style;
  }

  protected computeToPlainText(): string {
    throw new Error("Not implemented: computeToPlainText");
  }

  build(paragraph: Paragraph, inheritedStyle?: TextStyle) {
    throw new Error("Not implemented: build");
  }

  visitChildren(visitor: (span: InlineSpan) => void) {
    throw new Error("Not implemented: visitChildren");
  }

  toPlainText(): string {
    return this.computeToPlainText();
  }
}

export default InlineSpan;
