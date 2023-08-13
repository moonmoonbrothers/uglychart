import { BorderRadius, Path, Rect, RRect, Size } from "../type";
import Widget from "../widget/Widget";
import BaseClipPath from "./base/BaseClipPath";

export default function ClipOval({
  child,
  borderRadius = BorderRadius.zero,
  clipped = true,
  clipper,
  key,
}: {
  child: Widget;
  borderRadius?: BorderRadius;
  clipped?: boolean;
  clipper?: (size: Size) => RRect;
  key?: any;
}) {
  if (!clipped) return child;
  return new BaseClipPath({
    child,
    key,
    clipper: (size) =>
      new Path().addRRect(
        clipper
          ? clipper(size)
          : borderRadius.toRRect(
              Rect.fromLTWH({
                left: 0,
                top: 0,
                width: size.width,
                height: size.height,
              })
            )
      ),
  });
}
