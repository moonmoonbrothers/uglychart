import { Constraints } from "../type"
import Widget from "../widget/Widget"
import BaseConstrainedBox from "./base/BaseConstrainedBox"

function ConstrainedBox({
  child,
  constraints,
}: {
  child?: Widget
  constraints: Constraints
}) {
  return new BaseConstrainedBox({
    child,
    constraints,
  })
}

export default ConstrainedBox
