import {
  Container,
  Text,
  TextOverflow,
  type TextStyle,
  type EdgeInsets,
  BoxDecoration,
  TextAlign,
  TextWidthBasis,
} from "@moonmoonbrothers/flutterjs";

export default function Label({
  text,
  overflow = TextOverflow.visible,
  style,
  margin,
  backgroundColor,
  padding,
  decoration,
  softWrap = true,
  textAlign = TextAlign.center,
  textWidthBasis = TextWidthBasis.longestLine,
}: {
  text: string | number;
  overflow?: TextOverflow;
  style?: TextStyle;
  softWrap?: boolean;
  margin?: EdgeInsets;
  backgroundColor?: string;
  padding?: EdgeInsets;
  decoration?: BoxDecoration;
  textAlign?: TextAlign;
  textWidthBasis?: TextWidthBasis;
}) {
  return Container({
    margin,
    padding,
    decoration,
    color: backgroundColor,
    child: Text(`${text}`, {
      style: style,
      textWidthBasis,
      softWrap,
      overflow,
      textAlign,
    }),
  });
}
