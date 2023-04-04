import TextStyle from "./TextStyle";

class InlineSpan {
  style?: TextStyle;

  constructor({ style }: { style?: TextStyle }) {
    this.style = style;
  }

  protected computeToPlainText(): string {
    throw new Error("Not implemented: computeToPlainText");
  }

  toPlainText(): string {
    return this.computeToPlainText()
  }
}

export default InlineSpan;
