import EdgeInsets from "../utils/edgeInsets"
import type Widget from "../widget/Widget"
import _Padding from "./base/Padding"
import Expanded from "./Expanded"

export default function Padding({
  padding = EdgeInsets.all(0),
  child,
}: {
  child?: Widget
  padding?: EdgeInsets
}) {
  if (child instanceof Expanded) throw { message: "Padding must not have a Expanded Widget" }
  return new _Padding({ padding, child })
}
