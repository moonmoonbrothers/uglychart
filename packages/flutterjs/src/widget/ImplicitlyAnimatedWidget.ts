import { BuildContext } from ".";
import {
  AnimationController,
  Curve,
  CurvedAnimation,
  Curves,
  Tween,
} from "../animation";
import { State } from "../element";
import { Data } from "../type";
import { Nullable } from "../utils/type";
import StatefulWidget from "./StatefulWidget";

class ImplicitlyAnimatedWidget extends StatefulWidget {
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

class ImplicitlyAnimatedWidgetState extends State<ImplicitlyAnimatedWidget> {
  private controller: AnimationController;
  private animation: CurvedAnimation;

  initState(context: BuildContext): void {
    super.initState(context);

    this.constructTweens();
    this.didUpdateTweens();
    this.controller = new AnimationController({
      duration: this.widget.duration,
    });
    this.animation = this.createCurve();
  }

  didUpdateWidget(oldWidget: ImplicitlyAnimatedWidget): void {
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

  // @override
  // void didUpdateWidget(T oldWidget) {
  //   super.didUpdateWidget(oldWidget);
  //   if (widget.curve != oldWidget.curve) {
  //     _animation.dispose();
  //     _animation = _createCurve();
  //   }
  //   _controller.duration = widget.duration;
  //   if (_constructTweens()) {
  //     forEachTween((Tween<dynamic>? tween, dynamic targetValue, TweenConstructor<dynamic> constructor) {
  //       _updateTween(tween, targetValue);
  //       return tween;
  //     });
  //     _controller
  //       ..value = 0.0
  //       ..forward();
  //     didUpdateTweens();
  //   }
  // }

  private createCurve() {
    return new CurvedAnimation({
      curve: this.widget.curve,
      parent: this.controller,
    });
  }

  private constructTweens() {
    let shouldStartAnimation = false;
    this.forEachTween(({ getTween, setTween, targetValue }) => {
      if (targetValue == null) {
        setTween(null);
        return;
      }

      const tween = getTween();
      if (tween == null) {
        setTween(new Tween({ begin: targetValue, end: targetValue }));
      } else if (this.shouldAnimateTween(tween, targetValue)) {
        shouldStartAnimation = true;
        this.updateTween(tween, targetValue);
      }
    });

    return shouldStartAnimation;
  }

  private updateTween(
    tween: Tween<Data | number> | Nullable,
    targetValue: Data | number
  ): void {
    if (tween == null) {
      return;
    }
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
      return end === target;
    } else {
      const target = targetValue as Data;
      return end.equals(target);
    }
  }

  didUpdateTweens() {}

  forEachTween(
    visitor: (props: {
      getTween: () => Tween<Data | number> | Nullable;
      setTween: (tween: Nullable | Tween<Data | number>) => void;
      targetValue: Data | number | Nullable;
    }) => void
  ) {
    throw new Error("forEachTween must be implemented");
  }

  dispose(): void {
    super.dispose();
    this.controller.dispose();
  }
}

export default ImplicitlyAnimatedWidget;
