import type Widget from "../widget/Widget"
import BaseTransform from "./base/BaseTransform"

export default class Transform {
  private constructor() {
    //
  }

  static translate({
    offset: { x = 0, y = 0 } = {},
    child,
  }: {
    offset?: { x?: number; y?: number }
    child?: Widget
  }) {
    return new BaseTransform({ child, translate: { x, y } })
  }
}
