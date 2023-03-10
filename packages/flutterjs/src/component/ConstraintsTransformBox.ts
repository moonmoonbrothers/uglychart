import { Alignment, Constraints, Rect, TextDirection } from "../type"
import Widget from "../widget/Widget"
import BaseConstraintsTransformBox from "./base/BaseConstraintsTransformBox"
import ClipRect from "./ClipRect"

function ConstraintsTransformBox({
  clipped = false,
  alignment = Alignment.center,
  textDirection = TextDirection.ltr,
  constraintsTransform,
  child,
}: {
  clipped?: boolean
  alignment?: Alignment
  textDirection?: TextDirection
  child?: Widget
  constraintsTransform: (constraints: Constraints) => Constraints
}) {
  return ClipRect({
    clipped,
    clipper: (size) =>
      Rect.fromLTWH({
        left: 0,
        top: 0,
        width: size.width,
        height: size.height,
      }),
    child: new BaseConstraintsTransformBox({
      alignment,
      textDirection,
      constraintsTransform,
      child,
    }),
  })
}

export default ConstraintsTransformBox
