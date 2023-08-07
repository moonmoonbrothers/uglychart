import { Curve } from "../animation";
import { EdgeInsetsGeometry } from "../type/_types/EdgeInsets";
import type Widget from "../widget/Widget";
import BaseAnimatedPadding from "./base/BaseAnimatedPadding";
import Expanded from "./Expanded";

export default function Padding({
  padding,
  curve,
  child,
  key,
  duration,
}: {
  child?: Widget;
  padding: EdgeInsetsGeometry;
  duration: number;
  curve?: Curve;
  key?: string;
}) {
  if (child instanceof Expanded)
    throw { message: "Padding must not have a Expanded Widget" };
  return new BaseAnimatedPadding({ padding, child, curve, key, duration });
}
