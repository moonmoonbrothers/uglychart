import { Rect, TextOverflow } from "../type";
import ClipRect from "./ClipRect";
import _RichText, { RichTextProps } from "./base/BaseRichText";

function RichText({ overflow = TextOverflow.visible, ...rest }: RichTextProps) {
  return ClipRect({
    clipped: overflow === TextOverflow.clip,
    clipper: (size) =>
      Rect.fromLTWH({ left: 0, top: 0, width: size.width, height: size.width }),
    child: new _RichText({
      overflow,
      ...rest,
    }),
  });
}

export default RichText;
