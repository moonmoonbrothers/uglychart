import {
  Container,
  Text,
  type TextStyle,
  EdgeInsets,
  BoxDecoration,
  Row,
  MainAxisAlignment,
} from "@moonmoonbrothers/flutterjs";

export const defaultTitleConfig = {
  font: {
    fontSize: 18,
  },
  alignment: "start" as const,
  margin: EdgeInsets.only({ bottom: 10 }),
};

export default function Title({
  text,
  style,
  margin = defaultTitleConfig.margin,
  backgroundColor,
  padding,
  decoration,
  align = defaultTitleConfig.alignment,
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
