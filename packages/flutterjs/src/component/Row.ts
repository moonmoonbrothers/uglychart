import type Widget from "../widget/Widget";
import Flex from "./Flex";
import {
  type MainAxisAlignment,
  type CrossAxisAlignment,
  type VerticalDirection,
  type MainAxisSize,
  Axis,
} from "../type";

export default function Row({
  children,
  mainAxisAlignment,
  crossAxisAlignment,
  verticalDirection,
  mainAxisSize,
}: {
  children: Widget[];
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
  verticalDirection?: VerticalDirection;
  mainAxisSize?: MainAxisSize;
}) {
  return Flex({
    children,
    direction: Axis.horizontal,
    mainAxisAlignment,
    crossAxisAlignment,
    verticalDirection,
    mainAxisSize,
  });
}
