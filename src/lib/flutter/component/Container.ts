import type Alignment from "../utils/alignment"
import type EdgeInsets from "../utils/edgeInsets"
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
}: ContainerProps) {
  let current = child

  if (padding != null) {
    current = Padding({ child: current, padding })
  }

  if (alignment != null) {
    current = Align({ child: current, alignment })
  }

  current = new LimitedBox({
    child,
    width,
    height,
  })

  if (color != null) {
    current = new DecoratedBox({
      decoraiton: {
        color,
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
