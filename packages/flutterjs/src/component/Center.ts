import { Alignment } from "../type"
import type Widget from "../widget/Widget"
import Align from "./base/BaseAlign"

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
    widthFactor: width,
    heightFactor: height,
    alignment: Alignment.center,
  })
}
