import { Alignment, Rect, StackFit } from "../type";
import type Widget from "../widget/Widget";
import BaseIndexedStack from "./base/BaseIndexedStack";
import ClipRect from "./ClipRect";

export default function IndexedStack({
  clipped,
  children,
  alignment,
  sizing = StackFit.loose,
  index = 0,
}: {
  children: Widget[];
  clipped?: boolean;
  alignment?: Alignment;
  sizing?: StackFit;
  index?: number;
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
    child: new BaseIndexedStack({ children, alignment, sizing, index }),
  });
}
