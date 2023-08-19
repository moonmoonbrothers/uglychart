import { Size } from "../type";
import type Widget from "../widget/Widget";
import BaseCustomPaint, { type Painter } from "./base/BaseCustomPaint";

function CustomPaint<T extends Record<string, SVGElement>>({
  size = Size.zero,
  painter,
  child,
  key,
}: {
  painter: Painter<T>;
  size?: Size;
  child?: Widget;
  key?: any;
}) {
  return new BaseCustomPaint({
    child,
    painter,
    size,
    key,
  });
}

export default CustomPaint;
