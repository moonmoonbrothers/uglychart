import { Size } from "../type";
import type Widget from "../widget/Widget";
import BaseCustomPaint, { type Painter } from "./base/BaseCustomPaint";

function CustomPaint<T extends Record<string, SVGElement>>({
  size = Size.zero,
  painter,
  child
}: {
  painter: Painter<T>;
  size?: Size;
  child?: Widget
}) {
  return new BaseCustomPaint({
    child,
    painter,
    size,
  });
}

export default CustomPaint;
