import {
  Container,
  Text,
  type BoxDecoration,
  type EdgeInsets,
  Flex,
  Axis,
  MainAxisAlignment,
  Widget,
} from "@moonmoonbrothers/flutterjs";
import { Scale } from "../../../../common/CartesianChart/types";
export default function Series({
  direction,
  children,
}: {
  scale: Scale;
  direction: "horizontal" | "vertical";
  children: Widget[];
}) {
  return Flex({
    direction: direction === "vertical" ? Axis.horizontal : Axis.vertical,
    mainAxisAlignment: MainAxisAlignment.spaceAround,
    children,
  });
}
