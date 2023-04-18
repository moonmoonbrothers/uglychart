import {
  Alignment,
  Axis,
  ConstraintsTransformBox,
  CrossAxisAlignment,
  EdgeInsets,
  Expanded,
  Flex,
  Flexible,
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
  children: bars,
  gap,
}: BarGroupProps) {
  const Bars = ({ type }: { type: "negative" | "positive" }) =>
    bars.map((bar, index) => {
      const ratio =
        type === "negative"
          ? negativeBarRatios[index]
          : positiveBarRatios[index];
      return FractionallySizedBox({
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
          transform: Matrix4.diagonal3Values(
            direction === "horizontal" && area === "negative" ? -1 : 1,
            direction === "vertical" && area === "negative" ? -1 : 1,
            1
          ),
          child: Flex({
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment:
              direction === "horizontal"
                ? CrossAxisAlignment.start
                : CrossAxisAlignment.end,
            direction:
              direction === "vertical" ? Axis.horizontal : Axis.vertical,
            children: Bars({ type: area }),
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
  children: Widget[];
  gap: number;
};
