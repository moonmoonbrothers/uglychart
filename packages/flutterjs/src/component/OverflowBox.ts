import { Alignment } from "../type"
import { Widget } from "../widget"
import BaseOverflowBox from "./base/BaseOverflowBox"

function OverflowBox({
  alignment = Alignment.center,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  child
}: {
  alignment?: Alignment
  child?: Widget,
  maxWidth?: number
  maxHeight?: number
  minWidth?: number
  minHeight?: number
}) {
  return new BaseOverflowBox({
    child,
    alignment,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
  })
}

export default OverflowBox
