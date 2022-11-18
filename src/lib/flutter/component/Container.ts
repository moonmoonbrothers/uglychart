import type Alignment from "../utils/alignment"
import type BorderStyle from "../utils/borderstyle"
import type EdgeInsets from "../utils/edgeInsets"
import type Radius from "../utils/radius"
import type Widget from "../widget/Widget"
import Align from "./Align"
import DecoratedBox from "./base/DecoratedBox"
import LimitedBox from "./base/LimitedBox"
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
}: ContainerProps) {
  let current = child
  if (alignment != null) {
    current = Align({ child: current, alignment })
  }

  current = new LimitedBox({
    child: current,
    width,
    height,
  })

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

  if (margin != null) {
    current = Padding({
      child: current,
      padding: margin,
    })
  }

  return current
}
