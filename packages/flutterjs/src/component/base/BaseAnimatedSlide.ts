import { Curve, Tween } from "../../animation";
import { Alignment, Data, Offset } from "../../type";
import { Nullable } from "../../utils/type";
import { Widget } from "../../widget";
import Transform from "../Transform";
import {
  ImplicitlyAnimatedWidget,
  AnimatedBaseWidgetState,
} from "../../widget/ImplicitlyAnimatedWidget";
import FractionalTranslation from "../FractionalTranslation";

class BaseAnimatedSlide extends ImplicitlyAnimatedWidget {
  offset: Offset;
  child?: Widget;

  constructor({
    child,
    curve,
    duration,
    key,
    offset,
  }: {
    key?: string;
    child?: Widget;
    curve?: Curve;
    duration: number;
    alignment?: Alignment;
    offset: Offset;
  }) {
    super({ key, curve, duration });
    this.child = child;
    this.offset = offset;
  }
  createState(): AnimatedBaseWidgetState<BaseAnimatedSlide> {
    return new BaseAnimatedSlideState();
  }
}

class BaseAnimatedSlideState extends AnimatedBaseWidgetState<BaseAnimatedSlide> {
  private offset: Tween<Offset>;

  forEachTween(
    visitor: <T extends Data | number>(props: {
      tween: Nullable | Tween<T>;
      targetValue: T | Nullable;
    }) => Nullable | Tween<T>
  ): void {
    this.offset = visitor({
      tween: this.offset,
      targetValue: this.widget.offset,
    })!;
  }

  build(): Widget {
    return FractionalTranslation({
      translation: this.offset.evaluate(this.animation),
      child: this.widget.child,
    });
  }
}

export default BaseAnimatedSlide;
