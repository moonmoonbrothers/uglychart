import { Container, BoxDecoration } from "@moonmoonbrothers/flutterjs";
import { EdgeInsetsGeometry } from "@moonmoonbrothers/flutterjs/src/type/_types/EdgeInsets";
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
  margin?: EdgeInsetsGeometry;
}) {
  return Container({
    color,
    decoration,
    height: direction === "horizontal" ? thickness : undefined,
    width: direction === "horizontal" ? thickness : undefined,
    margin
  });
}
