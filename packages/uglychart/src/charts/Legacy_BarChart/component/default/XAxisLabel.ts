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

export default function XAxisLabel({
  text,
  overflow,
  style,
  margin,
  backgroundColor,
  padding,
  decoration,
  softWrap,
  textAlign,
  textWidthBasis,
}: {
  text: string;
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
    child: Text(text, {
      style: style,
      textWidthBasis,
      softWrap,
      overflow,
      textAlign,
    }),
  });
}
