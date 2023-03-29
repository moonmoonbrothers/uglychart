import { Alignment, Matrix4 } from "../type";
import type Widget from "../widget/Widget"
import BaseTransform from "./base/BaseTransform"

type Offset = {x: number, y: number}

function Transform({
    child,
    transform,
    origin,
    alignment,

}: {
    child?: Widget;
    transform: Matrix4;
    origin?: Offset;
    alignment?: Alignment;
}) {
  return new BaseTransform({
    child,
    transform,
    alignment,
    origin
  })
}

Transform.rotate = BaseTransform.rotate
Transform.scale = BaseTransform.scale
Transform.translate = BaseTransform.translate

export default Transform