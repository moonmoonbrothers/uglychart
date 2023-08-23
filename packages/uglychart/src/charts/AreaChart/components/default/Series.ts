import {
  Widget,
  Stack,
  StatefulWidget,
  State,
  Element,
  Animation,
  AnimationController,
  Tween,
  CurvedAnimation,
  ClipPath,
  ClipRect,
  Rect,
} from "@moonmoonbrothers/flutterjs";
import { functionalizeClass } from "../../../../utils";

class Series extends StatefulWidget {
  children: Widget[];
  constructor({ children }: { children: Widget[] }) {
    super();
    this.children = children;
  }
  createState(): State<StatefulWidget> {
    return new SeriesState();
  }
}

class SeriesState extends State<Series> {
  animationController: AnimationController;
  tweenAnimation: Animation<number>;
  initState(context: Element): void {
    this.animationController = new AnimationController({ duration: 300 });
    this.animationController.addListener(() => {
      this.setState();
    });
    const tween: Tween<number> = new Tween({ begin: 0, end: 1 });
    this.tweenAnimation = tween.animated(
      new CurvedAnimation({ parent: this.animationController })
    );
    this.animationController.forward();
  }
  build(context: Element): Widget {
    const { children } = this.widget;
    return ClipRect({
      clipped: true,
      clipper: ({ width, height }) => {
        return Rect.fromLTWH({
          left: 0,
          top: 0,
          width: width * this.tweenAnimation.value,
          height,
        });
      },
      child: Stack({
        children,
      }),
    });
  }
}

export default functionalizeClass(Series);
