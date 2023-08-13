import { Path, Rect, Size } from "../type";
import Widget from "../widget/Widget";
import BaseClipPath from "./base/BaseClipPath";

export default function ClipRect({
  child,
  clipper,
  clipped = true,
  key,
}: {
  child: Widget;
  clipper: (size: Size) => Rect;
  clipped?: boolean;
  key?: any;
}) {
  if (!clipped) return child;
  return new BaseClipPath({
    child,
    key,
    clipper: (size) => new Path().addRect(clipper(size)),
  });
}
