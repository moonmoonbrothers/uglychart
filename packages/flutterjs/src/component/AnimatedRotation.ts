import { Alignment, Curve } from "..";
import type Widget from "../widget/Widget";
import BaseAnimatedRotation from "./base/BaseAnimatedRotation";
function AnimatedOpacity(props: {
  turns: number;
  child?: Widget;
  curve?: Curve;
  duration: number;
  key?: string;
  alignment?: Alignment;
}) {
  return new BaseAnimatedRotation(props);
}

export default AnimatedOpacity;
