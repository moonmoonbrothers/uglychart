import {
  type EdgeInsets,
  type Radius,
  type BorderStyle,
  type Alignment,
  Constraints,
} from "../type";
import type Widget from "../widget/Widget";
import Align from "./Align";
import ConstrainedBox from "./base/BaseConstrainedBox";
import DecoratedBox from "./base/DecoratedBox";
import Padding from "./Padding";
import SizedBox from "./SizedBox";

type ContainerProps = {
  padding?: EdgeInsets;
  margin?: EdgeInsets;
  width?: number;
  height?: number;
  color?: string;
  border?: BorderStyle;
  radius?: Radius;
  child?: Widget;
  alignment?: Alignment;
};

export default function Container({
  padding,
  margin,
  child,
  color,
  width,
  height,
  alignment,
  radius,
  border,
}: ContainerProps = {}) {
  const constraint = Constraints.tightFor({ width, height });

  let current: Widget | undefined = child;

  if (current == null && !constraint.isTight) {
    current = SizedBox({ width: Infinity, height: Infinity });
  } else if (alignment != null) {
    current = Align({
      child: current,
      alignment,
      widthFactor: width,
      heightFactor: height,
    });
  }

  if (padding != null) {
    current = Padding({ child: current, padding });
  }

  if (color != null || border != null || radius != null) {
    current = new DecoratedBox({
      decoration: {
        color,
        border,
        radius,
      },
      child: current,
    });
  }

  current = new ConstrainedBox({
    child: current,
    constraints: constraint,
  });

  if (margin != null) {
    current = Padding({
      child: current,
      padding: margin,
    });
  }

  return current;
}
