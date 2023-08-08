import { Curve, Tween } from "../../animation";
import { Alignment, Data } from "../../type";
import { Nullable } from "../../utils/type";
import { Widget } from "../../widget";
import Transform from "../Transform";
import {
  ImplicitlyAnimatedWidget,
  AnimatedBaseWidgetState,
} from "../../widget/ImplicitlyAnimatedWidget";

class BaseAnimatedRotation extends ImplicitlyAnimatedWidget {
  turns: number;
  child?: Widget;
  alignment: Alignment;

  constructor({
    child,
    curve,
    duration,
    key,
    turns,
    alignment = Alignment.center,
  }: {
    key?: string;
    child?: Widget;
    curve?: Curve;
    duration: number;
    alignment?: Alignment;
    turns: number;
  }) {
    super({ key, curve, duration });
    this.child = child;
    this.turns = turns;
    this.alignment = alignment;
  }
  createState(): AnimatedBaseWidgetState<BaseAnimatedRotation> {
    return new BaseAnimatedRotationState();
  }
}

class BaseAnimatedRotationState extends AnimatedBaseWidgetState<BaseAnimatedRotation> {
  private turns: Tween<number> | Nullable;

  forEachTween(
    visitor: <T extends Data | number>(props: {
      tween: Nullable | Tween<T>;
      targetValue: T | Nullable;
    }) => Nullable | Tween<T>
  ): void {
    this.turns = visitor({
      tween: this.turns,
      targetValue: this.widget.turns,
    });
  }

  build(): Widget {
    return Transform.rotate({
      angle: (this.turns?.evaluate(this.animation) ?? 0) * Math.PI * 2,
      alignment: this.widget.alignment,
      child: this.widget.child,
    });
  }
}

export default BaseAnimatedRotation;
