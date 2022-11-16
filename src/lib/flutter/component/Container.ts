import type EdgeInsets from "../utils/edgeInsets"
import type Widget from "../widget/Widget"
import LimitedBox from "./base/LimitedBox"
import Padding from "./Padding"

type ContainerProps = {
  padding?: EdgeInsets
  margin?: EdgeInsets
  width?: number
  height?: number
  color?: string
  child?: Widget
}

export default function Container({
  padding,
  margin,
  child: _child,
  color,
  ...props
}: ContainerProps) {
  let child = _child
  if (child != null && padding != null) {
    child = Padding({ child, padding })
  }
  let current: Widget = new LimitedBox({
    style: { background: { color } },
    child,
    ...props,
  })

  if (margin != null) {
    current = Padding({
      child: current,
      padding: margin,
    })
  }

  return current
}
