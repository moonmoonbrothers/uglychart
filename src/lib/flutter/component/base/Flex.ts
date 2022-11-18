import MultiChildRenderObject from "../../renderobject/MultiChildRenderObject"
import Constraint from "../../utils/constraint"
import type { PaintContext } from "../../utils/type"
import MultiChildRenderObjectWidget from "../../widget/MultiChildRenerObjectWidget"
import type Widget from "../../widget/Widget"
import { RenderFlexible } from "./Flexible"

class Flex extends MultiChildRenderObjectWidget {
  flexDirection: "row" | "column"
  mainAxisAlignment: "start" | "end" //  end, between 추가할것
  crossAxisAlignment: "stretch" | "center" | "start" | "end"
  constructor({
    children,
    flexDirection,
    mainAxisAlignment = "start",
    crossAxisAlignment = "start",
  }: {
    children: Widget[]
    flexDirection: "row" | "column"
    mainAxisAlignment?: "start" | "end" // spaceBetween 추가할것
    crossAxisAlignment?: "stretch" | "center" | "start" | "end"
  }) {
    super({ children })
    this.flexDirection = flexDirection
    this.mainAxisAlignment = mainAxisAlignment
    this.crossAxisAlignment = crossAxisAlignment
  }

  createRenderObject(): RenderFlex {
    return new RenderFlex({
      flexDirection: this.flexDirection,
      mainAxisAlignment: this.mainAxisAlignment,
      crossAxisAlignment: this.crossAxisAlignment,
    })
  }
}

class RenderFlex extends MultiChildRenderObject {
  flexDirection: "row" | "column"
  mainAxisAlignment: "start" | "end" //  spaceBetween 추가할것
  crossAxisAlignment: "stretch" | "center" | "start" | "end"
  mainAxis: "width" | "height"
  crossAxis: "width" | "height"
  constructor({
    flexDirection,
    mainAxisAlignment,
    crossAxisAlignment,
  }: {
    flexDirection: "row" | "column"
    mainAxisAlignment: "start" | "end" // start, end, center 추가할것
    crossAxisAlignment: "stretch" | "center" | "start" | "end" // 'end' 추가할것
  }) {
    super()
    this.flexDirection = flexDirection
    this.mainAxisAlignment = mainAxisAlignment
    this.crossAxisAlignment = crossAxisAlignment
    this.mainAxis = this.flexDirection === "row" ? "width" : "height"
    this.crossAxis = this.flexDirection === "row" ? "height" : "width"
  }
  protected preformLayout(): void {
    let totalFlex = 0
    let [childIntrinsicMainAxisValue, crossAxisValue] = [0, 0]
    const mainAxisValue = this.constraint.getMax(this.mainAxis)

    // 공통
    this.children.forEach((child) => {
      child.layout(this.constraint)
      const flex = child instanceof RenderFlexible ? child.flex : 0
      totalFlex += flex
      if (flex === 0) {
        childIntrinsicMainAxisValue += child.size[this.mainAxis]
      }
      crossAxisValue =
        this.crossAxisAlignment === "stretch"
          ? this.constraint.getMax(this.crossAxis)
          : Math.max(crossAxisValue, child.size[this.crossAxis])
    })

    // 크기 결정
    this.size[this.mainAxis] = mainAxisValue
    this.size[this.crossAxis] = crossAxisValue

    const flexUnitSize =
      (mainAxisValue - childIntrinsicMainAxisValue) / totalFlex

    this.children.forEach((child) => {
      let childConstraint: Constraint

      if (!(child instanceof RenderFlexible)) {
        childConstraint = this.getNonFlexItemConstraint()
      } else {
        const flex = child.flex
        const childMainAxisValue = flex * flexUnitSize
        childConstraint = this.getFlexItemConstraint(childMainAxisValue)
      }

      child.layout(this.constraint.restrict(childConstraint))
    })

    const mainAxisOffsets = this.getChildOffsetsOnMainAxis(
      this.children.map(({ size }) => size[this.mainAxis])
    )

    this.children.forEach((child, i) => {
      const [mainAixsOffset, crossAixsOffset]: ("x" | "y")[] =
        this.flexDirection === "row" ? ["x", "y"] : ["y", "x"]

      child.offset[mainAixsOffset] = mainAxisOffsets[i]
      child.offset[crossAixsOffset] = this.getChildOffsetOnCrossAixs(
        child.size[this.crossAxis]
      )
    })
  }

  private getNonFlexItemConstraint() {
    let childConstraint: Constraint

    switch (this.crossAxisAlignment) {
      case "stretch":
        childConstraint = Constraint.tightOnly({
          [this.crossAxis]: this.size[this.crossAxis],
        })
        break
      default:
        childConstraint = this.constraint
    }

    return this.constraint.restrict(childConstraint)
  }

  private getFlexItemConstraint(childMainAxisValue: number) {
    let childConstraint: Constraint
    switch (this.crossAxisAlignment) {
      case "stretch":
        childConstraint = Constraint.tightOnly({
          [this.crossAxis]: this.size[this.crossAxis],
          [this.mainAxis]: childMainAxisValue,
        })
        break
      default:
        childConstraint = Constraint.tightOnly({
          [this.mainAxis]: childMainAxisValue,
        })
    }

    return this.constraint.restrict(childConstraint)
  }

  private getChildOffsetsOnMainAxis(childMainAxisValues: number[]) {
    let offsetsOnMainAxis: number[] = []

    if (this.mainAxisAlignment === "start") {
      let previousOffset = 0
      childMainAxisValues.forEach((value) => {
        offsetsOnMainAxis.push(previousOffset)
        previousOffset += value
      })
    } else if (this.mainAxisAlignment === "end") {
      let previousOffset = 0
      const temp: number[] = []
      ;[...childMainAxisValues].reverse().forEach((value) => {
        previousOffset += value
        temp.push(previousOffset)
      })
      offsetsOnMainAxis = temp
        .reverse()
        .map((value) => this.size[this.mainAxis] - value)
    } else {
      throw {
        message: "unimplemented mainAxisAlignment: " + this.mainAxisAlignment,
      }
    }

    return offsetsOnMainAxis
  }

  private getChildOffsetOnCrossAixs(childCrossAxisValue: number) {
    const parentCrossAxisValue = this.size[this.crossAxis]
    let offsetOnCrossAxis: number
    switch (this.crossAxisAlignment) {
      case "center":
        offsetOnCrossAxis = (parentCrossAxisValue - childCrossAxisValue) / 2
        break
      case "start":
        offsetOnCrossAxis = 0
        break
      case "end":
        offsetOnCrossAxis = parentCrossAxisValue - childCrossAxisValue
        break
      case "stretch":
        offsetOnCrossAxis = 0
        break
    }
    return offsetOnCrossAxis
  }

  override getIntrinsicHeight(): number {
    const sum = (acc: number, value: number) => acc + value
    const max = (acc: number, value: number) => Math.max(acc, value)
    const childInstrinsicHeights = this.children.map((child) =>
      child.getIntrinsicHeight()
    )
    return this.flexDirection === "row"
      ? childInstrinsicHeights.reduce(max, 0)
      : childInstrinsicHeights.reduce(sum, 0)
  }

  override getIntrinsicWidth(): number {
    const sum = (acc: number, value: number) => acc + value
    const max = (acc: number, value: number) => Math.max(acc, value)
    const childInstrinsicWidths = this.children.map((child) =>
      child.getIntrinsicWidth()
    )
    return this.flexDirection === "column"
      ? childInstrinsicWidths.reduce(max, 0)
      : childInstrinsicWidths.reduce(sum, 0)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  protected performPaint({ ctx }: PaintContext): void {}
}

export default Flex
