import {
  type EdgeInsets,
  type Alignment,
  Constraints,
  Decoration,
  BoxDecoration,
  Matrix4,
} from "../type";
import { assert } from "../utils";
import type Widget from "../widget/Widget";
import Align from "./Align";
import ConstrainedBox from "./ConstrainedBox";
import ColoredBox from "./ColoredBox";
import DecoratedBox from "./DecoratedBox";
import LimitedBox from "./LimitedBox";
import Padding from "./Padding";
import { EdgeInsetsGeometry } from "../type/_types/EdgeInsets";
import Transform from "./Transform";

type ContainerProps = {
  padding?: EdgeInsets;
  margin?: EdgeInsets;
  width?: number;
  height?: number;
  color?: string;
  decoration?: Decoration;
  child?: Widget;
  alignment?: Alignment;
  clipped?: boolean;
  constraints?: Constraints;
  transform?: Matrix4,
  transformAlignment?: Alignment;
};

export default function Container({
  padding,
  margin,
  child,
  color,
  width,
  height,
  alignment,
  decoration,
  constraints,
  clipped = false,
  transform, transformAlignment
}: ContainerProps = {}) {
  constraints =
    width != null || height != null
      ? constraints?.tighten({ width, height }) ??
        Constraints.tightFor({ width, height })
      : constraints;
  assert(
    color == null || decoration == null,
    "Color must be null when decoration is defined"
  );

  let current: Widget | undefined = child;

  if (current == null && (constraints == null || !constraints.isTight)) {
    current = LimitedBox({
      maxHeight: 0,
      maxWidth: 0,
      child: ConstrainedBox({
        constraints: Constraints.expand(),
      }),
    });
  } else if (alignment != null) {
    current = Align({ child: current, alignment });
  }

  let paddingIncludingDecoration: EdgeInsetsGeometry | undefined;

  if (decoration == null || decoration.padding == null) {
    paddingIncludingDecoration = padding;
  } else if (padding == null) {
    paddingIncludingDecoration = decoration.padding;
  } else {
    padding.add(decoration.padding);
  }

  if (paddingIncludingDecoration != null) {
    current = Padding({ padding: paddingIncludingDecoration, child: current });
  }

  if (color != null) {
    current = ColoredBox({
      color,
      child: current,
    });
  }

  // clip

  if (color != null || decoration != null) {
    if (color != null) {
      current = DecoratedBox({
        decoration: new BoxDecoration({
          color,
        }),
        child: current,
      });
    } else {
      current = DecoratedBox({
        decoration: decoration!,
        child: current,
      });
    }
  }

  if (constraints != null) {
    current = ConstrainedBox({
      child: current,
      constraints: constraints,
    });
  }

  if (margin != null) {
    current = Padding({
      child: current,
      padding: margin,
    });
  }

  if(transform != null) {
    current = Transform({
      transform: transform,
      alignment: transformAlignment, 
      child: current,
    }) 
  }

  return current;
}
