import RenderAligningShiftedBox from "../../renderobject/RenderAligningShiftedBox"
import RenderObject from "../../renderobject/RenderObject"
import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject"
import { Alignment, Constraints, TextDirection } from "../../type"
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget"
import Widget from "../../widget/Widget"

class BaseConstraintsTransformBox extends SingleChildRenderObjectWidget {
  alignment: Alignment
  textDirection: TextDirection
  constraintsTransform: (constraints: Constraints) => Constraints
  constructor({
    alignment = Alignment.center,
    child,
    constraintsTransform,
    textDirection = TextDirection.ltr,
  }: {
    child: Widget
    alignment?: Alignment
    textDirection?: TextDirection
    constraintsTransform
  }) {
    super({
      child,
    })
    this.alignment = alignment
    this.textDirection = textDirection
    this.constraintsTransform = constraintsTransform
  }

  static a() {}

  createRenderObject(): SingleChildRenderObject {
    throw {}
  }

  updateRenderObject(renderObject: RenderObject): void {}
}

class RenderConstraintsTransformBox extends RenderAligningShiftedBox {}

export default BaseConstraintsTransformBox
