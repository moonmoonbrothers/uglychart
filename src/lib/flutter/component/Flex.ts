import MultiChildRenderObject from "../renderobject/MultiChildRenderObject"
import Constraint from "../utils/constraint"
import Offset from "../utils/offset"
import type { PaintContext } from "../utils/type"
import MultiChildRenderObjectWidget from "../widget/MultiChildRenerObjectWidget"
import { RenderFlexItem } from "./FlexItem"

class Flex extends MultiChildRenderObjectWidget {
  createRenderObject(): RenderFlex {
    return new RenderFlex()
  }
}

class RenderFlex extends MultiChildRenderObject {
  protected preformLayout(constraint: Constraint): void {
    const [mainAxisKey, crossAxisKey] = ["height", "width"] as (
      | "width"
      | "height"
    )[]
    let [mainAxis, crossAxis] = [0, 0]
    let totalFlex = 0

    this.children.forEach((child) => {
      const flex = child instanceof RenderFlexItem ? child.flex : 0
      totalFlex += flex
      if (flex === 0) {
        child.layout(constraint)
        mainAxis += child.size[mainAxisKey]
        crossAxis = Math.max(mainAxis, child.size[crossAxisKey])
      }
    })

    const flexUnitSize = (constraint.getMax(mainAxisKey) - mainAxis) / totalFlex

    this.children.forEach((child) => {
      if (!(child instanceof RenderFlexItem)) return
      const flex = child.flex
      const childMainAxis = flex * flexUnitSize
      child.layout(
        new Constraint({
          ...constraint,
          [mainAxisKey === "width" ? "maxWidth" : "maxHeight"]: childMainAxis,
          [mainAxisKey === "width" ? "minWidth" : "minHeight"]: childMainAxis,
        })
      )
      mainAxis += child.size[mainAxisKey]
      crossAxis = Math.max(crossAxis, child.size[crossAxisKey])
    })

    let childOffset = Offset.zero()
    this.children.forEach((child) => {
      child.offset = childOffset
      childOffset = new Offset(
        mainAxisKey === "width"
          ? { x: childOffset.x + child.size.width, y: 0 }
          : { x: 0, y: childOffset.y + child.size.height }
      )
    })

    this.size[mainAxisKey] = mainAxis
    this.size[crossAxisKey] = crossAxis
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  protected performPaint({ ctx }: PaintContext): void {}
}

export default Flex
