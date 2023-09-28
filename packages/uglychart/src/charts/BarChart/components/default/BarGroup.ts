import {
  Alignment,
  Axis,
  CrossAxisAlignment,
  EdgeInsets,
  Element,
  Expanded,
  Flex,
  FractionallySizedBox,
  MainAxisSize,
  Matrix4,
  Padding,
  Stack,
  State,
  StatefulWidget,
  Transform,
  Widget,
  Animation,
  AnimationController,
  Tween,
  CurvedAnimation,
  Curves,
  Opacity,
} from "@moonmoonbrothers/flutterjs";
import { functionalizeClass } from "../../../../utils";

class BarGroup extends StatefulWidget {
  negativeAreaRatio: number;
  positiveAreaRatio: number;
  direction: "vertical" | "horizontal";
  negativeBarRatios: number[];
  positiveBarRatios: number[];
  children: Widget[];
  gap: number;
  constructor({
    negativeAreaRatio,
    positiveAreaRatio,
    direction,
    negativeBarRatios,
    positiveBarRatios,
    children,
    gap,
  }: BarGroupProps) {
    super();
    this.negativeAreaRatio = negativeAreaRatio;
    this.positiveAreaRatio = positiveAreaRatio;
    this.direction = direction;
    this.negativeBarRatios = negativeBarRatios;
    this.positiveBarRatios = positiveBarRatios;
    this.children = children;
    this.gap = gap;
  }

  createState(): State<StatefulWidget> {
    return new BarGroupState();
  }
}

class BarGroupState extends State<BarGroup> {
  animationController: AnimationController;
  tweenAnimation: Animation<number>;
  initState(context: Element): void {
    this.animationController = new AnimationController({ duration: 300 });
    this.animationController.addListener(() => {
      this.setState();
    });
    const tween: Tween<number> = new Tween({ begin: 0, end: 1 });
    this.tweenAnimation = tween.animated(
      new CurvedAnimation({
        parent: this.animationController,
        curve: Curves.easeInOut,
      })
    );
    this.animationController.forward();
  }
  build(context: Element): Widget {
    const {
      positiveAreaRatio,
      negativeAreaRatio,
      negativeBarRatios,
      positiveBarRatios,
      direction,
      children,
      gap,
    } = this.widget;

    const Bars = ({ type }: { type: "negative" | "positive" }) =>
      children.map((child, index) => {
        const ratio =
          type === "negative"
            ? negativeBarRatios[index]
            : positiveBarRatios[index];
        const animatedRatio = ratio * this.tweenAnimation.value;

        return FractionallySizedBox({
          widthFactor: direction === "horizontal" ? animatedRatio : undefined,
          heightFactor: direction === "vertical" ? animatedRatio : undefined,
          child: Opacity({
            opacity: ratio !== 0 ? 1 : 0,
            child,
          }),
        });
      });

    const areas: ("negative" | "positive")[] =
      direction === "vertical"
        ? ["positive", "negative"]
        : ["negative", "positive"];

    const Grouping = ({ children }: { children: Widget[] }) =>
      Flex({
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment:
          direction === "horizontal"
            ? CrossAxisAlignment.start
            : CrossAxisAlignment.end,
        direction: direction === "vertical" ? Axis.horizontal : Axis.vertical,
        children: children.map((child) =>
          Padding({
            padding: EdgeInsets.symmetric(
              direction === "horizontal"
                ? { vertical: gap / 2 }
                : { horizontal: gap / 2 }
            ),
            child,
          })
        ),
      });

    return Flex({
      direction: direction === "vertical" ? Axis.vertical : Axis.horizontal,
      children: areas.map((area) =>
        Expanded({
          flex: area === "negative" ? negativeAreaRatio : positiveAreaRatio,
          child: Transform({
            alignment: Alignment.center,
            transform: Matrix4.diagonal3Values(
              direction === "horizontal" && area === "negative" ? -1 : 1,
              direction === "vertical" && area === "negative" ? -1 : 1,
              1
            ),
            child: Stack({
              alignment:
                direction === "vertical"
                  ? Alignment.bottomCenter
                  : Alignment.centerLeft,
              children: [
                Grouping({
                  children: Bars({ type: area }),
                }),
              ],
            }),
          }),
        })
      ),
    });
  }
}
export default functionalizeClass(BarGroup);

type BarGroupProps = {
  negativeAreaRatio: number;
  positiveAreaRatio: number;
  direction: "vertical" | "horizontal";
  negativeBarRatios: number[];
  positiveBarRatios: number[];
  children: Widget[];
  gap: number;
};
