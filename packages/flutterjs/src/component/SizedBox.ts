import { Constraints, Size } from "../type"
import type Widget from "../widget/Widget"
import ConstrainedBox from "./ConstrainedBox"

function SizedBox({
  width,
  height,
  child,
}: {
  width?: number
  height?: number
  child?: Widget
}) {
  return ConstrainedBox({
    child,
    constraints: Constraints.tightFor({ width, height }),
  })
}

SizedBox.shrink = ({ child }: { child?: Widget } = {}) =>
  SizedBox({ width: 0, height: 0, child })

SizedBox.expand = ({ child }: { child?: Widget } = {}) =>
  SizedBox({ width: Infinity, height: Infinity, child })

SizedBox.fromSize = ({ child, size }: { child?: Widget; size?: Size } = {}) =>
  SizedBox({ width: size?.width, height: size?.height, child })

SizedBox.square = ({
  child,
  dimension,
}: {
  child?: Widget
  dimension?: number
} = {}) => SizedBox({ width: dimension, height: dimension, child })

export default SizedBox
