import { Alignment, Rect, StackFit } from "../type";
import type Widget from "../widget/Widget";
import BaseStack from "./base/BaseStack";
import ClipRect from "./ClipRect";

export default function Stack({
  clipped = false,
  children,
  alignment = Alignment.topLeft,
  fit,
}: {
  children: Widget[];
  clipped?: boolean;
  alignment?: Alignment;
  fit?: StackFit;
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
    child: new BaseStack({ children, alignment, fit }),
  });
}
