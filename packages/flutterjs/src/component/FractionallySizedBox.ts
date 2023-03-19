import Alignment from "../type/_types/Alignment"
import type Widget from "../widget/Widget"
import BaseFractionallySizedBox from "./base/BaseFractionallySizedBox"

export default function FractionallySizedBox({
  child,
  alignment = Alignment.center,
  widthFactor,
  heightFactor,
}: {
  child?: Widget
  alignment?: Alignment
  widthFactor?: number
  heightFactor?: number
}) {
  return new BaseFractionallySizedBox({
    child,
    alignment,
    widthFactor,
    heightFactor,
  })
}
