import type Widget from "../widget/Widget"
import Flex, {
  type CrossAxisAlignment,
  type MainAxisAlignment,
} from "./base/Flex"

export default function Row({
  children,
  mainAxisAlignment = "start",
  crossAxisAlignment = "center",
}: {
  children: Widget[]
  mainAxisAlignment?: MainAxisAlignment
  crossAxisAlignment?: CrossAxisAlignment
}) {
  return new Flex({
    children,
    flexDirection: "row",
    mainAxisAlignment,
    crossAxisAlignment,
  })
}
