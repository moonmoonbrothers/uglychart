import { Widget, Stack } from "@moonmoonbrothers/flutterjs";
import { Scale } from "../../../../common/CartesianChart/types";
export default function Series({
  children,
}: {
  children: Widget[];
}) {
  return Stack({
    children,
  });
}
