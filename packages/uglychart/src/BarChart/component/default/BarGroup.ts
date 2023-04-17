import {
  Alignment,
  Axis,
  Container,
  EdgeInsets,
  Expanded,
  Flex,
  FractionallySizedBox,
  MainAxisSize,
  Matrix4,
  Padding,
  Transform,
  Widget,
} from "@moonmoonbrothers/flutterjs";

export default function BarGroup({
  negativeAreaRatio,
  positiveAreaRatio,
  direction,
  negativeBarRatios,
  positiveBarRatios,
  bars,
  gap,
}: BarGroupProps) {
  const Bars = ({ type }: { type: "negative" | "positive" }) =>
    bars.map((bar, index) => {
      const ratio =
        type === "negative"
          ? negativeBarRatios[index]
          : positiveBarRatios[index];
      return FractionallySizedBox({
        alignment:
          direction === "vertical"
            ? Alignment.bottomCenter
            : Alignment.centerLeft,
        widthFactor: direction === "horizontal" ? ratio : undefined,
        heightFactor: direction === "vertical" ? ratio : undefined,
        child: Padding({
          padding: EdgeInsets.symmetric(
            direction === "horizontal"
              ? { vertical: gap / 2 }
              : { horizontal: gap / 2 }
          ),
          child: bar,
        }),
      });
    });

  const areas: ("negative" | "positive")[] =
    direction === "vertical"
      ? ["positive", "negative"]
      : ["negative", "positive"];

  return Flex({
    direction: direction === "vertical" ? Axis.vertical : Axis.horizontal,
    children: areas.map((area) =>
      Expanded({
        flex: area === "negative" ? negativeAreaRatio : positiveAreaRatio,
        child: Transform({
          alignment: Alignment.center,
          transform: Matrix4.diagonal3Values(1, area === "negative" ? 1 : 1, 1),
          child: Container({
            color: area === "negative" ? "purple" : undefined,
            child: Flex({
              mainAxisSize: MainAxisSize.min,
              direction:
                direction === "vertical" ? Axis.horizontal : Axis.vertical,
              children: Bars({ type: area }),
            }),
          }),
        }),
      })
    ),
  });
}

type BarGroupProps = {
  negativeAreaRatio: number;
  positiveAreaRatio: number;
  direction: "vertical" | "horizontal";
  negativeBarRatios: number[];
  positiveBarRatios: number[];
  bars: Widget[];
  gap: number;
};
