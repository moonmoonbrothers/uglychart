import { BorderRadius, Path, Rect, Size } from "../type"
import Widget from "../widget/Widget"
import BaseClipPath from "./base/BaseClipPath"

export default function ClipOval({
  child,
  borderRadius,
  clipped = true,
}: {
  child: Widget
  borderRadius: BorderRadius,
  clipped?: boolean
}) {
  if (!clipped) return child
  return new BaseClipPath({
    child,
    clipper: (size) => new Path()
  })
}
