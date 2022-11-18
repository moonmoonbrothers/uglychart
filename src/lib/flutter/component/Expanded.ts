import Flexible from "./base/Flexible"
import type Widget from "../widget/Widget"

export default function Expanded({
  flex = 1,
  child,
}: {
  flex?: number
  child?: Widget
}) {
  return new Flexible({
    flex,
    child: new Flexible({
      fit: "tight",
      child,
    }),
  })
}
