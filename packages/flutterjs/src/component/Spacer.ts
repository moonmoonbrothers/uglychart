import Flexible from "./Flexible"
import SizedBox from "./SizedBox"

function Spacer({ flex }: { flex?: number }) {
  return Flexible({
    flex,
    child: SizedBox.shrink(),
  })
}

export default Spacer
