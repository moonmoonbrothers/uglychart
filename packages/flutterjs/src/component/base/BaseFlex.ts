import MultiChildRenderObject from "../../renderobject/MultiChildRenderObject";
import { Constraints } from "../../type";
import type { PaintContext } from "../../utils/type";
import MultiChildRenderObjectWidget from "../../widget/MultiChildRenderObjectWidget";
import type Widget from "../../widget/Widget";
import { RenderFlexible } from "./BaseFlexible";

export type MainAxisAlignment =
  | "start"
  | "end"
  | "spaceEvenly"
  | "spaceBetween"
  | "spaceAround"
  | "center";

export type CrossAxisAlignment = "stretch" | "center" | "start" | "end";

export type Axis = 'horizontal' | 'vertical'

class Flex extends MultiChildRenderObjectWidget {
  direction: Axis
  mainAxisAlignment: MainAxisAlignment;
  crossAxisAlignment: CrossAxisAlignment;
  constructor({
    children,
    direction,
    mainAxisAlignment = "start",
    crossAxisAlignment = "center",
  }: {
    children: Widget[];
    direction: Axis
    mainAxisAlignment?: MainAxisAlignment;
    crossAxisAlignment?: CrossAxisAlignment;
  }) {
    super({ children });
    this.direction = direction;
    this.mainAxisAlignment = mainAxisAlignment;
    this.crossAxisAlignment = crossAxisAlignment;
  }

  createRenderObject(): RenderFlex {
    return new RenderFlex({
      direction: this.direction,
      mainAxisAlignment: this.mainAxisAlignment,
      crossAxisAlignment: this.crossAxisAlignment,
    });
  }

  updateRenderObject(renderObject: RenderFlex): void {
    renderObject.direction = this.direction;
    renderObject.mainAxisAlignment = this.mainAxisAlignment;
    renderObject.crossAxisAlignment = this.crossAxisAlignment;
  }
}

class RenderFlex extends MultiChildRenderObject {
  direction: Axis
  mainAxisAlignment: MainAxisAlignment;
  crossAxisAlignment: CrossAxisAlignment;
  get mainAxisSizeName(): "width" | "height" {
    return this.direction === "horizontal" ? "width" : "height";
  }
  get crossAxisSizeName(): "width" | "height" {
    return this.direction === "horizontal" ? "height" : "width";
  }
  get minMainAxisSizeName(): "minWidth" | "minHeight" {
    return this.direction === "horizontal" ? "minWidth" : "minHeight";
  }
  get maxMainAxisSizeName(): "maxWidth" | "maxHeight" {
    return this.direction === "horizontal" ? "maxWidth" : "maxHeight";
  }
  get minCrossAxisSizeName(): "minWidth" | "minHeight" {
    return this.direction === "horizontal" ? "minHeight" : "minWidth";
  }
  get maxCrossAxisSizeName(): "maxWidth" | "maxHeight" {
    return this.direction === "horizontal" ? "maxHeight" : "maxWidth";
  }
  constructor({
    direction,
    mainAxisAlignment,
    crossAxisAlignment,
  }: {
    direction: Axis,
    mainAxisAlignment: MainAxisAlignment;
    crossAxisAlignment: CrossAxisAlignment;
  }) {
    super({ isPainter: false });
    this.direction = direction;
    this.mainAxisAlignment = mainAxisAlignment;
    this.crossAxisAlignment = crossAxisAlignment;
  }
  protected preformLayout(): void {
    let totalFlex = 0;
    let [childIntrinsicMainAxisValue, crossAxisValue] = [0, 0];
    const mainAxisValue = this.constraints.getMax(this.mainAxisSizeName);

    // 공통
    this.children.forEach((child) => {
      child.layout(this.constraints);
      const flex = child instanceof RenderFlexible ? child.flex : 0;
      totalFlex += flex;
      if (flex === 0) {
        childIntrinsicMainAxisValue += child.size[this.mainAxisSizeName];
      }
      crossAxisValue =
        this.crossAxisAlignment === "stretch"
          ? this.constraints.getMax(this.crossAxisSizeName)
          : Math.max(crossAxisValue, child.size[this.crossAxisSizeName]);
    });

    // 크기 결정
    this.size[this.mainAxisSizeName] = mainAxisValue;
    this.size[this.crossAxisSizeName] = crossAxisValue;

    const flexUnitSize =
      (mainAxisValue - childIntrinsicMainAxisValue) / totalFlex;

    this.children.forEach((child) => {
      let childConstraint: Constraints;

      if (!(child instanceof RenderFlexible)) {
        childConstraint = this.getNonFlexItemConstraint();
      } else {
        const flex = child.flex;
        const childMainAxisValue = flex * flexUnitSize;
        childConstraint = this.getFlexItemConstraint(
          childMainAxisValue,
          child.fit
        );
      }

      child.layout(childConstraint.enforce(this.constraints));
    });

    const mainAxisOffsets = this.getChildOffsetsOnMainAxis(
      this.children.map(({ size }) => size[this.mainAxisSizeName])
    );

    this.children.forEach((child, i) => {
      const [mainAxisOffset, crossAxisOffset]: ("x" | "y")[] =
        this.direction === "horizontal" ? ["x", "y"] : ["y", "x"];

      child.offset[mainAxisOffset] = mainAxisOffsets[i];
      child.offset[crossAxisOffset] = this.getChildOffsetOnCrossAxis(
        child.size[this.crossAxisSizeName]
      );
    });
  }

  private getNonFlexItemConstraint() {
    let childConstraint: Constraints;

    switch (this.crossAxisAlignment) {
      case "stretch":
        childConstraint = Constraints.tightFor({
          [this.crossAxisSizeName]: this.size[this.crossAxisSizeName],
        });
        break;
      default:
        childConstraint = this.constraints;
    }

    return childConstraint.enforce(this.constraints);
  }

  private getFlexItemConstraint(childExtent: number, fit: "loose" | "tight") {
    return new Constraints({
      [this.minCrossAxisSizeName]:
        this.crossAxisAlignment === "stretch"
          ? this.constraints[this.maxCrossAxisSizeName]
          : 0,
      [this.maxCrossAxisSizeName]: this.constraints[this.maxCrossAxisSizeName],
      [this.maxMainAxisSizeName]: childExtent,
      [this.minMainAxisSizeName]: fit === "tight" ? childExtent : 0,
    });
  }

  private getChildOffsetsOnMainAxis(childMainAxisValues: number[]) {
    let offsetsOnMainAxis: number[] = [];
    const sum = (acc: number, value: number) => acc + value;
    const restSpaceSize =
      this.size[this.mainAxisSizeName] - childMainAxisValues.reduce(sum, 0);

    switch (this.mainAxisAlignment) {
      case "start":
        offsetsOnMainAxis = this._getChildOffsetsOnMainAxis({
          startOffset: 0,
          additionalSpace: 0,
          childMainAxisValues,
        });
        break;
      case "end":
        offsetsOnMainAxis = this._getChildOffsetsOnMainAxis({
          startOffset: restSpaceSize,
          additionalSpace: 0,
          childMainAxisValues,
        });
        break;
      case "spaceAround":
        // eslint-disable-next-line no-case-declarations
        const aroundSpace = restSpaceSize / childMainAxisValues.length;
        offsetsOnMainAxis = this._getChildOffsetsOnMainAxis({
          startOffset: aroundSpace / 2,
          additionalSpace: aroundSpace,
          childMainAxisValues,
        });
        break;
      case "spaceBetween":
        offsetsOnMainAxis = this._getChildOffsetsOnMainAxis({
          startOffset: 0,
          additionalSpace: restSpaceSize / (childMainAxisValues.length - 1),
          childMainAxisValues,
        });
        break;
      case "spaceEvenly":
        // eslint-disable-next-line no-case-declarations
        const evenSpace = restSpaceSize / (childMainAxisValues.length + 1);
        offsetsOnMainAxis = this._getChildOffsetsOnMainAxis({
          startOffset: evenSpace,
          additionalSpace: evenSpace,
          childMainAxisValues,
        });
        break;
    }

    return offsetsOnMainAxis;
  }

  private _getChildOffsetsOnMainAxis({
    startOffset,
    childMainAxisValues,
    additionalSpace,
  }: {
    startOffset: number;
    childMainAxisValues: number[];
    additionalSpace: number;
  }): number[] {
    const result: number[] = [];
    let previousOffset = startOffset;
    childMainAxisValues.forEach((value) => {
      result.push(previousOffset);
      previousOffset += value + additionalSpace;
    });
    return result;
  }

  private getChildOffsetOnCrossAxis(childCrossAxisValue: number) {
    const parentCrossAxisValue = this.size[this.crossAxisSizeName];
    let offsetOnCrossAxis: number;
    switch (this.crossAxisAlignment) {
      case "center":
        offsetOnCrossAxis = (parentCrossAxisValue - childCrossAxisValue) / 2;
        break;
      case "start":
        offsetOnCrossAxis = 0;
        break;
      case "end":
        offsetOnCrossAxis = parentCrossAxisValue - childCrossAxisValue;
        break;
      case "stretch":
        offsetOnCrossAxis = 0;
        break;
    }
    return offsetOnCrossAxis;
  }

  override getIntrinsicHeight(width: number): number {
    const sum = (acc: number, value: number) => acc + value;
    const max = (acc: number, value: number) => Math.max(acc, value);
    const childIntrinsicHeights = this.children.map((child) =>
      child.getIntrinsicHeight(width)
    );
    return this.direction === "horizontal"
      ? childIntrinsicHeights.reduce(max, 0)
      : childIntrinsicHeights.reduce(sum, 0);
  }

  override getIntrinsicWidth(height: number): number {
    const sum = (acc: number, value: number) => acc + value;
    const max = (acc: number, value: number) => Math.max(acc, value);
    const childIntrinsicWidths = this.children.map((child) =>
      child.getIntrinsicWidth(height)
    );
    return this.direction === "horizontal"
      ? childIntrinsicWidths.reduce(max, 0)
      : childIntrinsicWidths.reduce(sum, 0);
  }
}

export default Flex;
