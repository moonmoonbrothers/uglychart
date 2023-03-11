import type Widget from "../widget/Widget"
import Flexible from "./Flexible"

function Expanded({ flex, child }: { flex?: number; child: Widget }) {
  return Flexible({
    flex,
    child,
  })
}

export default Expanded
