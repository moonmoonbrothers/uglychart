import { Curve, Tween } from "../../animation";
import { Alignment, Data } from "../../type";
import { Nullable } from "../../utils/type";
import { Widget } from "../../widget";
import Align from "../Align";
import {
  ImplicitlyAnimatedWidget,
  AnimatedBaseWidgetState,
} from "../../widget/ImplicitlyAnimatedWidget";

class BaseAnimatedAlignWidget extends ImplicitlyAnimatedWidget {
  alignment: Alignment;
  child?: Widget;
  widthFactor: number | Nullable;
  heightFactor: number | Nullable;

  constructor({
    child,
    curve,
    duration,
    key,
    alignment,
    widthFactor,
    heightFactor,
  }: {
    key?: string;
    child?: Widget;
    curve?: Curve;
    duration: number;
    widthFactor?: number;
    heightFactor?: number;
    alignment: Alignment;
  }) {
    super({ key, curve, duration });
    this.alignment = alignment;
    this.child = child;
    this.widthFactor = widthFactor;
    this.heightFactor = heightFactor;
  }
  createState(): AnimatedBaseWidgetState<BaseAnimatedAlignWidget> {
    return new BaseAnimatedAlignWidgetState();
  }
}

class BaseAnimatedAlignWidgetState extends AnimatedBaseWidgetState<BaseAnimatedAlignWidget> {
  private alignmentTween: Tween<Alignment> | Nullable;
  private widthFactorTween: Tween<number> | Nullable;
  private heightFactorTween: Tween<number> | Nullable;

  forEachTween(
    visitor: <T extends Data | number>(props: {
      tween: Nullable | Tween<T>;
      targetValue: T | Nullable;
    }) => Nullable | Tween<T>
  ): void {
    this.alignmentTween = visitor({
      tween: this.alignmentTween,
      targetValue: this.widget.alignment,
    });
    this.widthFactorTween = visitor({
      tween: this.widthFactorTween,
      targetValue: this.widget.widthFactor,
    });
    this.heightFactorTween = visitor({
      tween: this.heightFactorTween,
      targetValue: this.widget.heightFactor,
    });
  }

  build(): Widget {
    return Align({
      alignment: this.alignmentTween?.evaluate(this.animation),
      widthFactor: this.widthFactorTween?.evaluate(this.animation),
      heightFactor: this.heightFactorTween?.evaluate(this.animation),
      child: this.widget.child,
    });
  }
}

export default BaseAnimatedAlignWidget;
