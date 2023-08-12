import {
  Alignment,
  Axis,
  CrossAxisAlignment,
  Expanded,
  Flex,
  FractionallySizedBox,
  MainAxisSize,
  Matrix4,
  Opacity,
  SizedBox,
  Stack,
  Transform,
  VerticalDirection,
  Widget,
} from "@moonmoonbrothers/flutterjs";
import { Utils } from "../../../../utils";
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

export default function BarGroup({
  negativeAreaRatio,
  positiveAreaRatio,
  direction,
  negativeBarRatios,
  positiveBarRatios,
  Bars: _Bars,
  DataLabels: _DataLabels,
}: BarGroupProps) {
  const isAllNegative = positiveBarRatios.reduce(Utils.sum) === 0;
  const isAllPositive = negativeBarRatios.reduce(Utils.sum) === 0;

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
        direction: direction === "horizontal" ? Axis.horizontal : Axis.vertical,
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
          child: Stack({
            alignment:
              direction === "vertical"
                ? Alignment.bottomCenter
                : Alignment.centerLeft,
            children: [
              Grouping({
                children: Bars({ type: area }),
              }),
              // Grouping({
              //   children: DataLabels({ type: area }),
              // }),
            ],
          }),
        }),
      })
    ),
  });
}
