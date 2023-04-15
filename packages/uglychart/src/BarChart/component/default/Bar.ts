import {
  Container,
  type BoxDecoration,
  type EdgeInsets,
} from "@moonmoonbrothers/flutterjs";
export default function Bar({
  thickness,
  direction,
  color,
  decoration,
  margin,
}: {
  thickness: number;
  direction: "horizontal" | "vertical";
  color?: string;
  decoration?: BoxDecoration;
  margin?: EdgeInsets;
}) {
  return Container({
    color,
    decoration,
    height: direction === "horizontal" ? thickness : undefined,
    width: direction === "horizontal" ? thickness : undefined,
    margin,
  });
}
