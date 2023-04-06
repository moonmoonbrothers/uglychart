import _RichText, { RichTextProps } from "./base/BaseRichText";

function RichText(props: RichTextProps) {
  return new _RichText(props);
}

export default RichText;
