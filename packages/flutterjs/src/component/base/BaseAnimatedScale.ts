import { Curve, Tween } from "../../animation";
import { Alignment, Calculatable } from "../../type";
import { Nullable } from "../../utils/type";
import { Widget } from "../../widget";
import Transform from "../Transform";
import {
  ImplicitlyAnimatedWidget,
  AnimatedBaseWidgetState,
} from "../../widget/ImplicitlyAnimatedWidget";

class BaseAnimatedScale extends ImplicitlyAnimatedWidget {
  scale: number;
  child?: Widget;
  alignement: Alignment;

  constructor({
    child,
    curve,
    duration,
    key,
    scale,
    alignment = Alignment.center,
  }: {
    key?: string;
    child?: Widget;
    curve?: Curve;
    duration: number;
    scale: number;
    alignment?: Alignment;
  }) {
    super({ key, curve, duration });
    this.child = child;
    this.scale = scale;
    this.alignement = alignment;
  }
  createState(): AnimatedBaseWidgetState<BaseAnimatedScale> {
    return new BaseAnimatedScaleState();
  }
}

class BaseAnimatedScaleState extends AnimatedBaseWidgetState<BaseAnimatedScale> {
  private scaleTween: Tween<number> | Nullable;

  forEachTween(
    visitor: <T extends Calculatable | number>(props: {
      tween: Nullable | Tween<T>;
      targetValue: T | Nullable;
    }) => Nullable | Tween<T>
  ): void {
    this.scaleTween = visitor({
      tween: this.scaleTween,
      targetValue: this.widget.scale,
    });
  }

  build(): Widget {
    return Transform.scale({
      scale: this.scaleTween?.evaluate(this.animation),
      alignment: this.widget.alignement,
      child: this.widget.child,
    });
  }
}

export default BaseAnimatedScale;
