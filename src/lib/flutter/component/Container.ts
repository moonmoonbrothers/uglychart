import {
  type EdgeInsets,
  type Radius,
  type BorderStyle,
  type Alignment,
  Constraint,
} from "$lib/flutter/type"
import type Widget from "../widget/Widget"
import Align from "./Align"
import ConstrainedBox from "./base/BaseConstrainedBox"
import DecoratedBox from "./base/DecoratedBox"
import LimitedBox from "./base/__deprecated__LimitedBox"
import Padding from "./Padding"

type ContainerProps = {
  padding?: EdgeInsets
  margin?: EdgeInsets
  width?: number
  height?: number
  color?: string
  border?: BorderStyle
  radius?: Radius
  child?: Widget
  alignment?: Alignment
}

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
  let current = child
  if (alignment != null) {
    current = Align({ child: current, alignment, width, height })
  }

  if (padding != null) {
    current = Padding({ child: current, padding })
  }

  if (color != null || border != null || radius != null) {
    current = new DecoratedBox({
      decoraiton: {
        color,
        border,
        radius,
      },
      child: current,
    })
  }

  current = new ConstrainedBox({
    child: current,
    constraint: Constraint.tightOnly({
      width,
      height,
    }),
  })

  if (margin != null) {
    current = Padding({
      child: current,
      padding: margin,
    })
  }

  return current
}
