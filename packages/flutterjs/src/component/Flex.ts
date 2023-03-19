import { Rect } from "../type";
import type Widget from "../widget/Widget";
import ClipRect from "./ClipRect";
import BaseFlex, {
  type CrossAxisAlignment,
  type MainAxisAlignment,
  type Axis,
  type VerticalDirection,
  type MainAxisSize,
} from "./base/BaseFlex";

export default function Flex({
  children,
  mainAxisAlignment = "start",
  crossAxisAlignment = "center",
  direction,
  clipped = false,
  verticalDirection = "down",
  mainAxisSize = "max",
}: {
  children: Widget[];
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
  verticalDirection?: VerticalDirection;
  mainAxisSize?: MainAxisSize;
  clipped?: boolean;
  direction: Axis;
}) {
  return ClipRect({
    clipped,
    clipper: (size) =>
      Rect.fromLTWH({
        left: 0,
        top: 0,
        width: size.width,
        height: size.height,
      }),
    child: new BaseFlex({
      children,
      direction,
      verticalDirection,
      //mainAxisSize,
      mainAxisAlignment,
      crossAxisAlignment,
    }),
  });
}
