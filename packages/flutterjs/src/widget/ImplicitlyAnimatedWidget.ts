import {
  AnimationController,
  Curve,
  CurvedAnimation,
  Curves,
  Tween,
} from "../animation";
import { State, type BuildContext } from "../element";
import { Data } from "../type";
import { Nullable } from "../utils/type";
import StatefulWidget from "./StatefulWidget";

export class ImplicitlyAnimatedWidget extends StatefulWidget {
  curve: Curve;
  duration: number;
  constructor({
    key,
    curve = Curves.linear,
    duration,
  }: {
    key?: string;
    curve?: Curve;
    duration: number;
  }) {
    super(key);
    this.curve = curve;
    this.duration = duration;
  }

  createState(): State<StatefulWidget> {
    return new ImplicitlyAnimatedWidgetState();
  }
}

export default ImplicitlyAnimatedWidget;

export class ImplicitlyAnimatedWidgetState<
  T extends ImplicitlyAnimatedWidget
> extends State<T> {
  protected controller: AnimationController;
  protected animation: CurvedAnimation;

  constructor() {
    super();
  }

  initState(context: BuildContext): void {
    super.initState(context);

    this.controller = new AnimationController({
      duration: this.widget.duration,
    });
    this.animation = this.createCurve();
    this.constructTweens();
    this.didUpdateTweens();
  }

  didUpdateWidget(oldWidget: T): void {
    super.didUpdateWidget(oldWidget);
    if (this.widget.curve !== oldWidget.curve) {
      this.animation.dispose();
      this.animation = this.createCurve();
    }
    this.controller.duration = this.widget.duration;
    if (this.constructTweens()) {
      this.controller.reset();
      this.controller.forward();
      this.didUpdateTweens();
    }
  }

  private createCurve() {
    return new CurvedAnimation({
      curve: this.widget?.curve,
      parent: this.controller,
    });
  }

  private constructTweens() {
    let shouldStartAnimation = false;
    this.forEachTween(({ tween, targetValue }) => {
      if (targetValue == null) {
        return null;
      }

      if (tween == null) {
        return new Tween({ begin: targetValue, end: targetValue });
      }

      if (this.shouldAnimateTween(tween, targetValue)) {
        shouldStartAnimation = true;
        this.updateTween(tween, targetValue);
      }

      return tween;
    });

    return shouldStartAnimation;
  }

  private updateTween(
    tween: Tween<Data | number>,
    targetValue: Data | number
  ): void {
    tween.begin = tween.evaluate(this.animation);
    tween.end = targetValue;
  }

  private shouldAnimateTween(
    tween: Tween<Data | number>,
    targetValue: Data | number
  ): boolean {
    const { end } = tween;
    if (typeof end === "number") {
      const target = targetValue as number;
      return end !== target;
    } else {
      const target = targetValue as Data;
      return !end.equals(target);
    }
  }

  didUpdateTweens() {}

  forEachTween(
    visitor: <T extends Data | number>(props: {
      tween: Tween<T> | Nullable;
      targetValue: T | Nullable;
    }) => Tween<T> | Nullable
  ) {
    throw new Error("forEachTween must be implemented");
  }

  dispose(): void {
    super.dispose();
    this.controller.dispose();
  }
}

export class AnimatedBaseWidgetState<
  T extends ImplicitlyAnimatedWidget
> extends ImplicitlyAnimatedWidgetState<T> {
  initState(context: BuildContext): void {
    super.initState(context);
    this.controller.addListener(() => {
      this.handleChange();
    });
  }
  private handleChange() {
    this.setState(() => {});
  }
}
