import { Curve } from "../animation";
import {
  type EdgeInsets,
  type Alignment,
  Constraints,
  Decoration,
  Matrix4,
} from "../type";
import type Widget from "../widget/Widget";
import BaseAnimatedContainer from "./base/BaseAnimatedContainer";

type ContainerProps = {
  padding?: EdgeInsets;
  margin?: EdgeInsets;
  width?: number;
  height?: number;
  color?: string;
  decoration?: Decoration;
  child?: Widget;
  alignment?: Alignment;
  clipped?: boolean;
  constraints?: Constraints;
  transform?: Matrix4;
  transformAlignment?: Alignment;
  curve?: Curve;
  duration: number;
};

export default function AnimatedContainer(props: ContainerProps) {
  return new BaseAnimatedContainer(props);
}
