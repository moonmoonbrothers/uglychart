import { Curve, Tween } from "../../animation";
import { Data } from "../../type";
import { Nullable } from "../../utils/type";
import { Widget } from "../../widget";
import Opacity from "../Opacity";
import {
  ImplicitlyAnimatedWidget,
  AnimatedBaseWidgetState,
} from "../../widget/ImplicitlyAnimatedWidget";

class BaseAnimatedOpacity extends ImplicitlyAnimatedWidget {
  opacity: number;
  child?: Widget;

  constructor({
    child,
    curve,
    duration,
    key,
    opacity,
  }: {
    key?: string;
    child?: Widget;
    curve?: Curve;
    duration: number;
    opacity: number;
  }) {
    super({ key, curve, duration });
    this.child = child;
    this.opacity = opacity;
  }
  createState(): AnimatedBaseWidgetState<BaseAnimatedOpacity> {
    return new BaseAnimatedOpacityState();
  }
}

class BaseAnimatedOpacityState extends AnimatedBaseWidgetState<BaseAnimatedOpacity> {
  private opacityTween: Tween<number> | Nullable;

  forEachTween(
    visitor: <T extends Data | number>(props: {
      tween: Nullable | Tween<T>;
      targetValue: T | Nullable;
    }) => Nullable | Tween<T>
  ): void {
    this.opacityTween = visitor({
      tween: this.opacityTween,
      targetValue: this.widget.opacity,
    });
  }

  build(): Widget {
    return Opacity({
      opacity: this.opacityTween?.evaluate(this.animation) ?? 1,
      child: this.widget.child,
    });
  }
}

export default BaseAnimatedOpacity;
