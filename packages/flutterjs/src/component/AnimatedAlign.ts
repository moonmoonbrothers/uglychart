import { Curve } from "../animation";
import { Alignment } from "../type";
import { Widget } from "../widget";
import BaseAnimatedAlignWidget from "./base/BaseAnimatedAlignWidget";

export default function AnimatedAlignWidget({
  key,
  child,
  duration,
  widthFactor,
  heightFactor,
  alignment,
  curve,
}: {
  curve?: Curve;
  duration: number;
  widthFactor?: number;
  heightFactor?: number;
  alignment: Alignment;
  child?: Widget;
  key?: string;
}) {
  return new BaseAnimatedAlignWidget({
    key,
    child,
    duration,
    widthFactor,
    heightFactor,
    alignment,
    curve,
  });
}
