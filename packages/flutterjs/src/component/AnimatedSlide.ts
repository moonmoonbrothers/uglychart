import { Curve } from "../animation";
import { Offset } from "../type";
import type Widget from "../widget/Widget";
import BaseAnimatedSlide from "./base/BaseAnimatedSlide";
function AnimatedSlide(props: {
  offset: Offset;
  child?: Widget;
  duration: number;
  curve?: Curve;
  key?: string;
}) {
  return new BaseAnimatedSlide(props);
}

export default AnimatedSlide;
