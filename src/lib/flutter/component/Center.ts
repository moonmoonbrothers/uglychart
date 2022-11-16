import Alignment from "../utils/alignment"
import type Widget from "../widget/Widget"
import Align from "./base/Align"

export default function Center({
  child,
  width = Infinity,
  height = Infinity,
}: {
  child?: Widget
  width?: number
  height?: number
}) {
  return new Align({
    child,
    width,
    height,
    alignment: Alignment.center,
  })
}
