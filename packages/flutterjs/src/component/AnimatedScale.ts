import { Alignment, Curve } from "..";
import type Widget from "../widget/Widget";
import BaseAlignmentScale from "./base/BaseAnimatedScale";

function AnimatedScale({
  scale,
  child,
  key,
  duration,
  curve,
  alignment,
}: {
  scale: number;
  child?: Widget;
  curve?: Curve;
  duration: number;
  alignment?: Alignment;
  key?: string;
}) {
  return new BaseAlignmentScale({
    scale,
    child,
    key,
    duration,
    curve,
    alignment,
  });
}

export default AnimatedScale;
