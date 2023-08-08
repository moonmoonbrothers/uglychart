import { Curve } from "..";
import Alignment from "../type/_types/Alignment";
import type Widget from "../widget/Widget";
import BaseAnimatedFractionallySizedBox from "./base/BaseAnimatedFractionallySizedBox";

export default function AnimatedFractionallySizedBox({
  child,
  alignment,
  widthFactor,
  heightFactor,
  duration,
  key,
  curve,
}: {
  child?: Widget;
  alignment?: Alignment;
  widthFactor?: number;
  heightFactor?: number;
  curve?: Curve;
  duration: number;
  key?: string;
}) {
  return new BaseAnimatedFractionallySizedBox({
    child,
    alignment,
    widthFactor,
    heightFactor,
    curve,
    duration,
    key,
  });
}
