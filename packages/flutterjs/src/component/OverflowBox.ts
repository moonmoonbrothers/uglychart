import { Alignment } from "../type"
import BaseOverflowBox from "./base/BaseOverflowBox"

function OverflowBox({
  alignment = Alignment.center,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
}: {
  alignment?: Alignment
  maxWidth?: number
  maxHeight?: number
  minWidth?: number
  minHeight?: number
}) {
  return new BaseOverflowBox({
    alignment,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
  })
}

export default OverflowBox
