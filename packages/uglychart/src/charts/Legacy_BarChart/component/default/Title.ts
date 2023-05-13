import {
  Container,
  Text,
  type TextStyle,
  type EdgeInsets,
  BoxDecoration,
  Row,
  MainAxisAlignment,
} from "@moonmoonbrothers/flutterjs";

export default function Title({
  text,
  style,
  margin,
  backgroundColor,
  padding,
  decoration,
  align = "start",
}: {
  text: string;
  style?: TextStyle;
  margin?: EdgeInsets;
  backgroundColor?: string;
  padding?: EdgeInsets;
  decoration?: BoxDecoration;
  align?: "start" | "center" | "end";
}) {
  return Row({
    mainAxisAlignment:
      align === "start"
        ? MainAxisAlignment.start
        : align === "center"
        ? MainAxisAlignment.center
        : MainAxisAlignment.end,
    children: [
      Container({
        margin,
        padding,
        decoration,
        color: backgroundColor,
        child: Text(text, {
          style: style,
        }),
      }),
    ],
  });
}
