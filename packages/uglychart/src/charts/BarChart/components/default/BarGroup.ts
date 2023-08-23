import {
  Alignment,
  Axis,
  ClipRect,
  CrossAxisAlignment,
  EdgeInsets,
  Element,
  Expanded,
  Flex,
  FractionallySizedBox,
  MainAxisSize,
  Matrix4,
  Opacity,
  Padding,
  Rect,
  SizedBox,
  Stack,
  State,
  StatefulWidget,
  Transform,
  VerticalDirection,
  Widget,
  Animation,
  AnimationController,
  Tween,
  CurvedAnimation,
} from "@moonmoonbrothers/flutterjs";
import { Utils, funcionalizeClass } from "../../../../utils";
import { IgnoreChildSize } from "../../../../common/components";

class BarGroup extends StatefulWidget {
  negativeAreaRatio: number;
  positiveAreaRatio: number;
  direction: "vertical" | "horizontal";
  negativeBarRatios: number[];
  positiveBarRatios: number[];
  Bars: Widget[];
  DataLabels: Widget[];
  gap: number;
  constructor({
    negativeAreaRatio,
    positiveAreaRatio,
    direction,
    negativeBarRatios,
    positiveBarRatios,
    Bars,
    DataLabels,
    gap,
  }: BarGroupProps) {
    super();
    this.negativeAreaRatio = negativeAreaRatio;
    this.positiveAreaRatio = positiveAreaRatio;
    this.direction = direction;
    this.negativeBarRatios = negativeBarRatios;
    this.positiveBarRatios = positiveBarRatios;
    this.Bars = Bars;
    this.DataLabels = DataLabels;
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
    this.animationController = new AnimationController({ duration: 200 });
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
    const {
      positiveAreaRatio,
      negativeAreaRatio,
      negativeBarRatios,
      positiveBarRatios,
      Bars: _Bars,
      DataLabels: _DataLabels,
      direction,
      gap,
    } = this.widget;
    const isAllNegative = positiveBarRatios.reduce(Utils.sum, 0) === 0;
    const isAllPositive = negativeBarRatios.reduce(Utils.sum, 0) === 0;

    const Bars = ({ type }: { type: "negative" | "positive" }) =>
      _Bars.map((bar, index) => {
        const ratio =
          type === "negative"
            ? negativeBarRatios[index]
            : positiveBarRatios[index];

        return FractionallySizedBox({
          widthFactor: direction === "horizontal" ? ratio : undefined,
          heightFactor: direction === "vertical" ? ratio : undefined,
          child: bar,
        });
      });

    const DataLabels = ({ type }: { type: "negative" | "positive" }) =>
      _Bars.map((bar, index) => {
        const invisible =
          (type === "negative" && isAllPositive) ||
          (type === "positive" && isAllNegative) ||
          (type === "negative" && negativeBarRatios[index] === 0) ||
          (type === "positive" &&
            positiveBarRatios[index] === 0 &&
            negativeBarRatios[index] !== 0);

        const ratio =
          type === "negative"
            ? negativeBarRatios[index]
            : positiveBarRatios[index];

        return Flex({
          direction:
            direction === "horizontal" ? Axis.horizontal : Axis.vertical,
          verticalDirection:
            direction === "vertical"
              ? VerticalDirection.up
              : VerticalDirection.down,
          mainAxisSize: MainAxisSize.min,
          children: [
            Opacity({
              opacity: 0,
              child: FractionallySizedBox({
                widthFactor: direction === "horizontal" ? ratio : undefined,
                heightFactor: direction === "vertical" ? ratio : undefined,
                child: bar,
              }),
            }),
            invisible
              ? SizedBox.shrink()
              : Transform({
                  alignment: Alignment.center,
                  transform: Matrix4.diagonal3Values(
                    direction === "horizontal" && type === "negative" ? -1 : 1,
                    direction === "vertical" && type === "negative" ? -1 : 1,
                    1
                  ),
                  child: IgnoreChildSize({
                    ignoreWidth: true,
                    ignoreHeight: true,
                    alignment:
                      direction === "horizontal" && type === "positive"
                        ? Alignment.centerLeft
                        : direction === "horizontal" && type === "negative"
                        ? Alignment.centerRight
                        : direction === "vertical" && type === "positive"
                        ? Alignment.bottomCenter
                        : Alignment.topCenter,
                    child: _DataLabels[index],
                  }),
                }),
          ],
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
            child: ClipRect({
              clipped: true,
              clipper: ({ width, height }) => {
                const margin = 20;
                return Rect.fromLTRB({
                  left: 0,
                  top:
                    direction === "vertical"
                      ? (height + margin) * (1 - this.tweenAnimation.value) -
                        margin
                      : -margin,
                  right:
                    direction === "horizontal"
                      ? (width + margin) * this.tweenAnimation.value
                      : width + margin,
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
                    children: Bars({ type: area }),
                  }),
                  Grouping({
                    children: DataLabels({ type: area }),
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
export default funcionalizeClass(BarGroup);

type BarGroupProps = {
  negativeAreaRatio: number;
  positiveAreaRatio: number;
  direction: "vertical" | "horizontal";
  negativeBarRatios: number[];
  positiveBarRatios: number[];
  Bars: Widget[];
  DataLabels: Widget[];
  gap: number;
};
