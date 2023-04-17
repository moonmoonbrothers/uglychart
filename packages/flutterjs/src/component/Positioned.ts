import type Widget from "../widget/Widget"
import BasePositioned from "./base/BasePositioned"

export default function Positioned(props: {
  top?: number
  bottom?: number
  left?: number
  right?: number
  child?: Widget
}) {
  return new BasePositioned(props)
}
