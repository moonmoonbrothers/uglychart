import InlineSpan from "./InlineSpan";
import TextStyle from "./TextStyle";

class TextSpan extends InlineSpan {
  text?: string;

  constructor({ style, text }: { style?: TextStyle; text?: string }) {
    super({ style });
    this.text = text;
  }

  protected computeToPlainText(): string {
    return ''
  }
}

export default TextSpan;
