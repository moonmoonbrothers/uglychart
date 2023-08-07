import { Curve } from "..";
import type Widget from "../widget/Widget";
import BaseAnimatedOpacity from "./base/BaseAnimatedOpacity";
function AnimatedOpacity({
  opacity,
  child,
  key,
  duration,
  curve,
}: {
  opacity: number;
  child?: Widget;
  curve?: Curve;
  duration: number;
  key?: string;
}) {
  return new BaseAnimatedOpacity({ opacity, child, key, duration, curve });
}

export default AnimatedOpacity;
