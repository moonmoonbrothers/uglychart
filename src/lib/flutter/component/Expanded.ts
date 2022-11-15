import FlexItem from "./base/FlexItem"
import type Widget from "../widget/Widget"

export default function Expanded({
  flex = 1,
  child,
}: {
  flex?: number
  child?: Widget
}) {
  return new FlexItem({
    flex,
    child: new FlexItem({
      fit: "tight",
      child,
    }),
  })
}
