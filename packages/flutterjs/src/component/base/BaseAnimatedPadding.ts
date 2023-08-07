import { Curve, Tween } from "../../animation";
import { Data } from "../../type";
import { Nullable } from "../../utils/type";
import { Widget } from "../../widget";
import Padding from "../Padding";
import {
  ImplicitlyAnimatedWidget,
  AnimatedBaseWidgetState,
} from "../../widget/ImplicitlyAnimatedWidget";
import EdgeInsets, { EdgeInsetsGeometry } from "../../type/_types/EdgeInsets";

class BaseAnimatedPadding extends ImplicitlyAnimatedWidget {
  opacity: number;
  padding: EdgeInsetsGeometry;
  child?: Widget;

  constructor({
    child,
    curve,
    duration,
    key,
    padding = EdgeInsets.all(0),
  }: {
    key?: string;
    child?: Widget;
    curve?: Curve;
    duration: number;
    padding?: EdgeInsetsGeometry;
  }) {
    super({ key, curve, duration });
    this.child = child;
    this.padding = padding;
  }
  createState(): AnimatedBaseWidgetState<BaseAnimatedPadding> {
    return new BaseAnimatedPaddingState();
  }
}

class BaseAnimatedPaddingState extends AnimatedBaseWidgetState<BaseAnimatedPadding> {
  private paddingTween: Tween<EdgeInsetsGeometry> | Nullable;

  forEachTween(
    visitor: <T extends Data | number>(props: {
      tween: Nullable | Tween<T>;
      targetValue: T | Nullable;
    }) => Nullable | Tween<T>
  ): void {
    this.paddingTween = visitor({
      tween: this.paddingTween,
      targetValue: this.widget.padding,
    });
  }

  build(): Widget {
    return Padding({
      padding: this.paddingTween?.evaluate(this.animation),
      child: this.widget.child,
    });
  }
}

export default BaseAnimatedPadding;
