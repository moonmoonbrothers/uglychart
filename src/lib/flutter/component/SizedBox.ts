import type Widget from "../widget/Widget"
import LimitedBox from "./base/BaseSizedBox"

export default function SizeBox({
  width = 0,
  height = 0,
  child,
}: {
  width?: number
  height?: number
  child?: Widget
}) {
  return new LimitedBox({
    child,
    width,
    height,
    stretchable: false,
  })
}
