import { Curve, Tween } from "../../animation";
import { Alignment, Calculatable } from "../../type";
import { Nullable } from "../../utils/type";
import { Widget } from "../../widget";
import FractionallySizedBox from "../FractionallySizedBox";
import {
  ImplicitlyAnimatedWidget,
  AnimatedBaseWidgetState,
} from "../../widget/ImplicitlyAnimatedWidget";

class BaseAnimatedFractionallySizedBox extends ImplicitlyAnimatedWidget {
  alignment: Alignment;
  widthFactor?: number;
  heightFactor?: number;
  child?: Widget;

  constructor({
    child,
    curve,
    duration,
    key,
    widthFactor,
    heightFactor,
    alignment = Alignment.center,
  }: {
    key?: string;
    child?: Widget;
    curve?: Curve;
    duration: number;
    widthFactor?: number;
    heightFactor?: number;
    alignment?: Alignment;
  }) {
    super({ key, curve, duration });
    this.child = child;
    this.widthFactor = widthFactor;
    this.heightFactor = heightFactor;
    this.alignment = alignment;
  }
  createState(): AnimatedBaseWidgetState<BaseAnimatedFractionallySizedBox> {
    return new BaseAnimatedFractionallySizedBoxState();
  }
}

class BaseAnimatedFractionallySizedBoxState extends AnimatedBaseWidgetState<BaseAnimatedFractionallySizedBox> {
  private widthFactor: Tween<number> | Nullable;
  private heightFactor: Tween<number> | Nullable;
  private alignment: Tween<Alignment> | Nullable;

  forEachTween(
    visitor: <T extends Calculatable | number>(props: {
      tween: Nullable | Tween<T>;
      targetValue: T | Nullable;
    }) => Nullable | Tween<T>
  ): void {
    this.alignment = visitor({
      tween: this.alignment,
      targetValue: this.widget.alignment,
    });
    this.heightFactor = visitor({
      tween: this.heightFactor,
      targetValue: this.widget.heightFactor,
    });
    this.widthFactor = visitor({
      tween: this.widthFactor,
      targetValue: this.widget.widthFactor,
    });
  }

  build(): Widget {
    return FractionallySizedBox({
      widthFactor: this.widthFactor?.evaluate(this.animation),
      heightFactor: this.heightFactor?.evaluate(this.animation),
      alignment: this.alignment?.evaluate(this.animation),
      child: this.widget.child,
    });
  }
}

export default BaseAnimatedFractionallySizedBox;
