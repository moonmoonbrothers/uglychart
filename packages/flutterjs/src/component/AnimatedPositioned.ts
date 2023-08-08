import { Curve } from "../animation";
import type Widget from "../widget/Widget";
import BaseAnimatedPositioned from "./base/BaseAnimatedPositioned";

export default function Positioned(props: {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  width?: number;
  height?: number;
  child?: Widget;
  duration: number;
  curve?: Curve;
  key?: string;
}) {
  return new BaseAnimatedPositioned(props);
}
