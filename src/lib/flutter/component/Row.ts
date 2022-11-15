import type Widget from "../widget/Widget"
import Flex from "./base/Flex"

export default function Row({
  children,
  mainAxisAlignment = "start",
  crossAxisAlignment = "center",
}: {
  children: Widget[]
  mainAxisAlignment?: "start" | "end"
  crossAxisAlignment?: "stretch" | "start" | "center" | "end"
}) {
  return new Flex({
    children,
    flexDirection: "row",
    mainAxisAlignment,
    crossAxisAlignment,
  })
}
