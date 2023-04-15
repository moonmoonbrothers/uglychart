
import {
  Container,
  Text,
  TextOverflow,
  type TextStyle,
  type EdgeInsets,
  BoxDecoration,
  TextAlign,
} from "@moonmoonbrothers/flutterjs";

export default function YAxisLabel({
  text,
  overflow,
  style,
  margin,
  backgroundColor,
  padding,
  decoration,
  softWrap,
  textAlign,
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
}) {
  return Container({
    margin,
    padding,
    decoration,
    color: backgroundColor,
    child: Text(text, {
      style: style,
      softWrap,
      overflow,
      textAlign,
    }),
  });
}
