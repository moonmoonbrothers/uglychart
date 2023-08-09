import { CalculatableTween, Curve, Tween } from "../../animation";
import {
  Alignment,
  BoxDecoration,
  Constraints,
  Calculatable,
  Decoration,
  Matrix4,
  Data,
} from "../../type";
import { Nullable } from "../../utils/type";
import { Widget } from "../../widget";
import Container from "../Container";
import {
  ImplicitlyAnimatedWidget,
  AnimatedBaseWidgetState,
} from "../../widget/ImplicitlyAnimatedWidget";
import { EdgeInsetsGeometry } from "../../type/_types/EdgeInsets";
import { assert } from "../../utils";

class BaseAnimatedContainer extends ImplicitlyAnimatedWidget {
  child?: Widget;
  padding?: EdgeInsetsGeometry;
  margin?: EdgeInsetsGeometry;
  width?: number;
  height?: number;
  color?: string;
  decoration?: Decoration;
  alignment?: Alignment;
  clipped?: boolean;
  constraints?: Constraints;
  transform?: Matrix4;
  transformAlignment?: Alignment;

  constructor({
    child,
    curve,
    duration,
    key,
    alignment,
    width,
    height,
    constraints,
    color,
    decoration,
    margin,
    padding,
    clipped,
    transform,
    transformAlignment,
  }: {
    key?: string;
    child?: Widget;
    curve?: Curve;
    duration: number;
    alignment?: Alignment;
    padding?: EdgeInsetsGeometry;
    margin?: EdgeInsetsGeometry;
    width?: number;
    height?: number;
    color?: string;
    decoration?: Decoration;
    clipped?: boolean;
    constraints?: Constraints;
    transform?: Matrix4;
    transformAlignment?: Alignment;
  }) {
    super({ key, curve, duration });
    assert(
      !(color != null && decoration != null),
      "color must not be null when decoration exists"
    );
    this.child = child;
    this.alignment = alignment;
    this.decoration = color != null ? new BoxDecoration({ color }) : decoration;
    this.width = width;
    this.height = height;
    this.padding = padding;
    this.margin = margin;
    this.clipped = clipped;
    this.constraints = constraints;
    this.transform = transform;
    this.transformAlignment = transformAlignment;
  }
  createState(): AnimatedBaseWidgetState<BaseAnimatedContainer> {
    return new BaseAnimatedContainerState();
  }
}

class BaseAnimatedContainerState extends AnimatedBaseWidgetState<BaseAnimatedContainer> {
  private alignment: Tween<Alignment> | Nullable;
  private width: Tween<number> | Nullable;
  private height: Tween<number> | Nullable;
  private padding: Tween<EdgeInsetsGeometry> | Nullable;
  private margin: Tween<EdgeInsetsGeometry> | Nullable;
  private transformAlignment: Tween<Alignment> | Nullable;
  // private constrains: Tween<Constraints> | Nullable
  // private decoration: Tween<BoxDecoration> | Nullable
  // private transform: Tween<Matrix4> | Nullable

  forEachTween(
    visitor: <V extends number | Data, T extends Tween<V>>(props: {
      tween: Nullable | T;
      targetValue: V | Nullable;
      constructor: (value: V) => T;
    }) => Nullable | T
  ): void {
    let result = visitor({
      tween: this.alignment,
      targetValue: this.widget.alignment,
      constructor: (value) =>
        new CalculatableTween({ begin: value, end: value }),
    });
    this.width = visitor({
      tween: this.width,
      targetValue: this.widget.width,
      constructor: (value) => new Tween({ begin: value, end: value }),
    });
    this.height = visitor({
      tween: this.height,
      targetValue: this.widget.height,
      constructor: (value) => new Tween({ begin: value, end: value }),
    });
    this.padding = visitor({
      tween: this.padding,
      targetValue: this.widget.padding,
      constructor: (value) =>
        new CalculatableTween({ begin: value, end: value }),
    });
    this.margin = visitor({
      tween: this.margin,
      targetValue: this.widget.margin,
      constructor: (value) =>
        new CalculatableTween({ begin: value, end: value }),
    });
    this.transformAlignment = visitor({
      tween: this.transformAlignment,
      targetValue: this.widget.transformAlignment,
      constructor: (value) =>
        new CalculatableTween({ begin: value, end: value }),
    });
  }

  build(): Widget {
    return Container({
      alignment: this.alignment?.evaluate(this.animation),
      width: this.width?.evaluate(this.animation),
      height: this.height?.evaluate(this.animation),
      clipped: this.widget.clipped,
      padding: this.padding?.evaluate(this.animation),
      margin: this.margin?.evaluate(this.animation),
      transformAlignment: this.transformAlignment?.evaluate(this.animation),
      //transform
      //decoration
      //constraints
      color: "red",
      child: this.widget.child,
    });
  }
}

export default BaseAnimatedContainer;
