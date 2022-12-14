import Alignment from "../type/_types/alignment"
import type Widget from "../widget/Widget"
import _Align from "./base/BaseAlign"

export default function Align({
  child,
  alignment = Alignment.topLeft,
  width = Infinity,
  height = Infinity,
}: {
  child?: Widget
  alignment?: Alignment
  width?: number
  height?: number
}) {
  return new _Align({
    child,
    alignment,
    width,
    height,
  })
}
