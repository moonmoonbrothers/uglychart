import {
  type EdgeInsets,
  type Alignment,
  Constraints,
  Decoration,
  BoxDecoration,
} from "../type";
import { assert } from "../utils";
import type Widget from "../widget/Widget";
import Align from "./Align";
import ConstrainedBox from "./base/BaseConstrainedBox";
import ColoredBox from "./ColoredBox";
import DecoratedBox from "./DecoratedBox";
import Padding from "./Padding";
import SizedBox from "./SizedBox";

type ContainerProps = {
  padding?: EdgeInsets;
  margin?: EdgeInsets;
  width?: number;
  height?: number;
  color?: string;
  decoration?: Decoration;
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
  decoration,
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

  current = new ConstrainedBox({
    child: current,
    constraints: constraint,
  });

  if(color != null) {
    current = ColoredBox({
      color,
      child: current
    })
  }

  if (color != null || decoration != null) {
    assert(
      color == null || decoration == null,
      "Color must be null when decoration is defined"
    );
    if (color != null) {
      current = DecoratedBox({
        decoration: new BoxDecoration({
          color,
        }),
        child: current,
      });
    } else {
      current = DecoratedBox({
        decoration: decoration!,
        child: current,
      });
    }
  }

  if (margin != null) {
    current = Padding({
      child: current,
      padding: margin,
    });
  }

  return current;
}
