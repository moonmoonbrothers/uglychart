import { Alignment, TextDirection } from "../type"
import Widget from "../widget/Widget"
import ConstraintsTransformBox from "./ConstraintsTransformBox"

function UnconstrainedBox({
  alignment = Alignment.center,
  clipped = false,
  child,
  textDirection,
  constrainedAxis,
}: {
  child: Widget
  textDirection?: TextDirection
  alignment?: Alignment
  clipped?: boolean
  constrainedAxis?: "vertical" | "horizontal"
}) {
  return ConstraintsTransformBox({
    alignment,
    child,
    clipped,
    textDirection,
    constraintsTransform: (function () {
      if (constrainedAxis == null) {
        return ConstraintsTransformBox.unconstrained
      }

      switch (constrainedAxis) {
        case "vertical":
          return ConstraintsTransformBox.widthUnconstrained
        case "horizontal":
          return ConstraintsTransformBox.heightUnconstrained
      }
    })(),
  })
}

export default UnconstrainedBox
