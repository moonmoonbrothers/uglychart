import { Path, Size } from "../type";
import Widget from "../widget/Widget";
import BaseClipPath from "./base/BaseClipPath";

export default function ClipPath({
  child,
  clipper,
  clipped = true,
  key,
}: {
  child?: Widget;
  clipper: (size: Size) => Path;
  clipped?: boolean;
  key?: any;
}) {
  if (!clipped) return child;
  return new BaseClipPath({ child, clipper, key });
}
