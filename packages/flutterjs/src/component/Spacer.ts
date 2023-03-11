import Expanded from "./Expanded"
import SizedBox from "./SizedBox"

function Spacer({ flex }: { flex?: number } = {}) {
  return Expanded({
    flex,
    child: SizedBox.shrink(),
  })
}

export default Spacer
