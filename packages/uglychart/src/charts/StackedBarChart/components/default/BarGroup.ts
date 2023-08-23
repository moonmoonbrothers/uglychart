import {
  Alignment,
  Axis,
  CrossAxisAlignment,
  Expanded,
  Flex,
  FractionallySizedBox,
  MainAxisSize,
  Matrix4,
  SizedBox,
  Stack,
  Transform,
  Widget,
  StatefulWidget,
  State,
  VerticalDirection,
  Animation,
  AnimationController,
  Tween,
  CurvedAnimation,
  BuildContext,
  ClipRect,
  Rect,
} from "@moonmoonbrothers/flutterjs";
import { Utils, functionalizeClass } from "../../../../utils";
import { IgnoreChildSize } from "../../../../common/components";

type BarGroupProps = {
  negativeAreaRatio: number;
  positiveAreaRatio: number;
  direction: "vertical" | "horizontal";
  negativeBarRatios: number[];
  positiveBarRatios: number[];
  Bars: Widget[];
  DataLabels: Widget[];
};

class BarGroup extends StatefulWidget {
  negativeAreaRatio: number;
  positiveAreaRatio: number;
  direction: "vertical" | "horizontal";
  negativeBarRatios: number[];
  positiveBarRatios: number[];
  Bars: Widget[];
  DataLabels: Widget[];
  constructor({
    negativeAreaRatio,
    positiveAreaRatio,
    direction,
    negativeBarRatios,
    positiveBarRatios,
    Bars,
    DataLabels,
  }: BarGroupProps) {
    super();
    this.negativeAreaRatio = negativeAreaRatio;
    this.positiveAreaRatio = positiveAreaRatio;
    this.direction = direction;
    this.negativeBarRatios = negativeBarRatios;
    this.positiveBarRatios = positiveBarRatios;
    this.Bars = Bars;
    this.DataLabels = DataLabels;
  }

  createState(): State<StatefulWidget> {
    return new BarGroupState();
  }
}

class BarGroupState extends State<BarGroup> {
  animationController: AnimationController;
  tweenAnimation: Animation<number>;
  initState(context: BuildContext): void {
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
  build(context: BuildContext): Widget {
    const {
      negativeAreaRatio,
      negativeBarRatios,
      positiveAreaRatio,
      positiveBarRatios,
      Bars: _Bars,
      DataLabels: _DataLabels,
      direction,
    } = this.widget;

    const BarsWithDataLabels = ({ type }: { type: "negative" | "positive" }) =>
      _Bars.map((bar, index) => {
        const ratio =
          type === "negative"
            ? negativeBarRatios[index]
            : positiveBarRatios[index];
        if (ratio === 0) {
          return SizedBox.shrink();
        }

        return FractionallySizedBox({
          widthFactor: direction === "horizontal" ? ratio : undefined,
          heightFactor: direction === "vertical" ? ratio : undefined,
          child: Stack({
            alignment: Alignment.center,
            children: [bar, DataLabels({ type })[index]],
          }),
        });
      });

    const DataLabels = ({ type }: { type: "negative" | "positive" }) =>
      Array.from({ length: _Bars.length }, (_, i) => i).map((_, index) => {
        return Transform({
          alignment: Alignment.center,
          transform: Matrix4.diagonal3Values(
            direction === "horizontal" && type === "negative" ? -1 : 1,
            direction === "vertical" && type === "negative" ? -1 : 1,
            1
          ),
          child: IgnoreChildSize({
            ignoreWidth: true,
            ignoreHeight: true,
            child: _DataLabels[index],
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
        direction: direction === "vertical" ? Axis.vertical : Axis.horizontal,
        children: children.map((child) => child),
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
            child: ClipRect({
              clipped: true,
              clipper: ({ width, height }) => {
                return Rect.fromLTRB({
                  left: 0,
                  top:
                    direction === "vertical"
                      ? height * (1 - this.tweenAnimation.value)
                      : 0,
                  right:
                    direction === "horizontal"
                      ? width * this.tweenAnimation.value
                      : width,
                  bottom: height,
                });
              },
              child: Stack({
                alignment:
                  direction === "vertical"
                    ? Alignment.bottomCenter
                    : Alignment.centerLeft,
                children: [
                  Grouping({
                    children: BarsWithDataLabels({ type: area }),
                  }),
                ],
              }),
            }),
          }),
        })
      ),
    });
  }
}

export default functionalizeClass(BarGroup);
