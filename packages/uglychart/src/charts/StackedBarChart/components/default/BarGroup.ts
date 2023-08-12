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
} from "@moonmoonbrothers/flutterjs";
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
      })
    ),
  });
}
