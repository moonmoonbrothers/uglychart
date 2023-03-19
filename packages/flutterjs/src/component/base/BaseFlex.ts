import MultiChildRenderObject from "../../renderobject/MultiChildRenderObject";
import { Constraints, Size } from "../../type";
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
export type Axis = "horizontal" | "vertical";
export type VerticalDirection = "up" | "down";
export type MainAxisSize = "min" | "max";

class Flex extends MultiChildRenderObjectWidget {
  direction: Axis;
  mainAxisAlignment: MainAxisAlignment;
  crossAxisAlignment: CrossAxisAlignment;
  verticalDirection: VerticalDirection;
  mainAxisSize: MainAxisSize;
  constructor({
    children,
    direction,
    mainAxisAlignment = "start",
    crossAxisAlignment = "center",
    verticalDirection = "down",
    mainAxisSize = "max",
  }: {
    children: Widget[];
    direction: Axis;
    mainAxisAlignment?: MainAxisAlignment;
    crossAxisAlignment?: CrossAxisAlignment;
    verticalDirection?: VerticalDirection;
    mainAxisSize?: MainAxisSize;
  }) {
    super({ children });
    this.direction = direction;
    this.mainAxisAlignment = mainAxisAlignment;
    this.crossAxisAlignment = crossAxisAlignment;
    this.verticalDirection = verticalDirection;
    this.mainAxisSize = mainAxisSize;
  }

  createRenderObject(): RenderFlex {
    return new RenderFlex({
      direction: this.direction,
      mainAxisAlignment: this.mainAxisAlignment,
      crossAxisAlignment: this.crossAxisAlignment,
      verticalDirection: this.verticalDirection,
      mainAxisSize: this.mainAxisSize,
    });
  }

  updateRenderObject(renderObject: RenderFlex): void {
    renderObject.direction = this.direction;
    renderObject.mainAxisAlignment = this.mainAxisAlignment;
    renderObject.crossAxisAlignment = this.crossAxisAlignment;
    renderObject.verticalDirection = this.verticalDirection;
    renderObject.mainAxisSize = this.mainAxisSize;
  }
}

class RenderFlex extends MultiChildRenderObject {
  direction: Axis;
  mainAxisAlignment: MainAxisAlignment;
  crossAxisAlignment: CrossAxisAlignment;
  verticalDirection: VerticalDirection;
  mainAxisSize: MainAxisSize;
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
    verticalDirection,
    mainAxisSize,
  }: {
    direction: Axis;
    mainAxisAlignment: MainAxisAlignment;
    crossAxisAlignment: CrossAxisAlignment;
    verticalDirection: VerticalDirection;
    mainAxisSize: MainAxisSize;
  }) {
    super({ isPainter: false });
    this.direction = direction;
    this.mainAxisAlignment = mainAxisAlignment;
    this.crossAxisAlignment = crossAxisAlignment;
    this.verticalDirection = verticalDirection;
    this.mainAxisSize = mainAxisSize;
  }
  protected preformLayout(): void {
    let totalFlex = 0;
    let [childIntrinsicMainAxisValue, crossAxisValue, mainAxisValue] = [
      0, 0, 0,
    ];
    const sortedChildren =
      this.verticalDirection === "down"
        ? this.children
        : [...this.children].reverse();

    sortedChildren.forEach((child) => {
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

    const flexUnitSize =
      (this.constraints.getMax(this.mainAxisSizeName) -
        childIntrinsicMainAxisValue) /
      totalFlex;

    /*
      layout children
    */
    sortedChildren.forEach((child) => {
      let childConstraint: Constraints;

      if (!(child instanceof RenderFlexible)) {
        childConstraint = this.getNonFlexItemConstraint(crossAxisValue);
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

    /*
      determine size of widget
    */
    this.size = this.constraints.constrain(
      new Size({
        [this.mainAxisSizeName]:
          this.mainAxisSize === "max"
            ? this.constraints.getMax(this.mainAxisSizeName)
            : sortedChildren
                .map((child) => child.size[this.mainAxisSizeName])
                .reduce((acc, childMainAxisSize) => acc + childMainAxisSize),
        [this.crossAxisSizeName]: crossAxisValue,
      } as any)
    );

    const mainAxisOffsets = this.getChildOffsetsOnMainAxis(
      sortedChildren.map(({ size }) => size[this.mainAxisSizeName])
    );

    sortedChildren.forEach((child, i) => {
      const [mainAxisOffset, crossAxisOffset]: ("x" | "y")[] =
        this.direction === "horizontal" ? ["x", "y"] : ["y", "x"];

      child.offset[mainAxisOffset] = mainAxisOffsets[i];
      child.offset[crossAxisOffset] = this.getChildOffsetOnCrossAxis(
        child.size[this.crossAxisSizeName]
      );
    });
  }

  private getNonFlexItemConstraint(crossAxisValue: number) {
    let childConstraint: Constraints;

    switch (this.crossAxisAlignment) {
      case "stretch":
        childConstraint = Constraints.tightFor({
          [this.crossAxisSizeName]: crossAxisValue,
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
        const evenSpace = restSpaceSize / (childMainAxisValues.length + 1);
        offsetsOnMainAxis = this._getChildOffsetsOnMainAxis({
          startOffset: evenSpace,
          additionalSpace: evenSpace,
          childMainAxisValues,
        });
        break;
      case "center":
        offsetsOnMainAxis = this._getChildOffsetsOnMainAxis({
          startOffset: restSpaceSize / 2,
          additionalSpace: 0,
          childMainAxisValues,
        });
        break;
      default:
        throw new Error(
          `this mainAixsAlignment(${this.mainAxisAlignment}) is not supported yet`
        );
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
    return this.direction === "vertical"
      ? childIntrinsicWidths.reduce(max, 0)
      : childIntrinsicWidths.reduce(sum, 0);
  }
}

export default Flex
