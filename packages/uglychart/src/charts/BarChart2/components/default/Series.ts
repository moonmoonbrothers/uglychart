import {
  Container,
  Text,
  type BoxDecoration,
  type EdgeInsets,
} from "@moonmoonbrothers/flutterjs";
import { Scale } from "../../../../common/CartesianChart/types";
export default function Series({
  direction,
  scale,
}: {
  scale: Scale;
  direction: "horizontal" | "vertical";
}) {
  return Container({
    child: Text("무야호!~!@~!#~!#$"),
  });
}
