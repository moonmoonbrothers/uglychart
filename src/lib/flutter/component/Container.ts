import type EdgeInsets from "../utils/edgeInsets"
import type Widget from "../widget/Widget"
import LimitedBox, { type LimitedBoxProps } from "./base/LimitedBox"
import Padding from "./Padding"

type ContainerProps = LimitedBoxProps & {
  padding?: EdgeInsets
  margin?: EdgeInsets
}

export default function Container({
  padding,
  margin,
  child: _child,
  ...props
}: ContainerProps) {
  let child = _child
  if (child != null && padding != null) {
    child = Padding({ child, padding })
  }
  let current: Widget = new LimitedBox({ ...props, child })

  if (margin != null) {
    current = Padding({
      child: current,
      padding: margin,
    })
  }

  return current
}
