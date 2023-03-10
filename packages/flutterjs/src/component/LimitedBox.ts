import Widget from "../widget/Widget"
import BaseLimitedBox from "./base/BaseLimitedBox"

function LimitedBox({
  maxHeight = Infinity,
  maxWidth = Infinity,
  child,
}: {
  maxWidth?: number
  maxHeight?: number
  child?: Widget
}) {
  return new BaseLimitedBox({
    maxHeight,
    maxWidth,
    child,
  })
}

export default LimitedBox
