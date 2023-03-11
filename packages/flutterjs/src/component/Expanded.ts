import type Widget from "../widget/Widget"
import Flexible from "./Flexible"

function Expanded({ flex, child }: { flex?: number; child: Widget }) {
  return Flexible({
    flex,
    child,
    fit: 'tight'
  })
}

export default Expanded
