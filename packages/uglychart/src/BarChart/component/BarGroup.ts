import {
  Column,
  ComponentWidget,
  EdgeInsets,
  Flexible,
  Padding,
  Row,
  Spacer,
  Stack,
  Widget,
  SizedBox,
  BuildContext,
  MainAxisAlignment,
  CrossAxisAlignment,
  Flex,
} from "@moonmoonbrothers/flutterjs";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";
import { Scale } from "../util";
import Bar from "./Bar";

export type BarGroupProps = {
  direction: "vertical" | "horizontal";
  index: number;
  label: string;
  scale: Scale;
};

class BarGroup extends ComponentWidget {
  constructor(private props: BarGroupProps) {
    super();
  }
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context);
    const { barGroup } = CustomProvider.of(context);
    const { scale, direction, label } = this.props;
    const data = DataProvider.of(context);

    if (barGroup.type === "custom") {
      return barGroup.Custom({ Bar }, { theme, data, ...this.props });
    }

    const { barBackgroundColors: backgroundColors = ["gray"], gap = 2 } =
      barGroup;
    const { datasets } = data;

    const barGroupRatio = {
      negative: scale.min > 0 ? 0 : (0 - scale.min) / (scale.max - scale.min),
      positive: scale.max < 0 ? 0 : (scale.max - 0) / (scale.max - scale.min),
    };

    const barRatio = {
      negative: (value: number) => {
        if (value > 0 || scale.min > 0) return 0;

        const max = -1 * scale.min;
        const min = Math.min(-1 * scale.max, 0);

        return (-1 * value - min) / (max - min);
      },
      positive: (value: number) => {
        if (value < 0 || scale.max < 0) return 0;

        const max = scale.max;
        const min = Math.min(scale.min, 0);

        return (value - min) / (max - min);
      },
    };

    type AreaType = "negative" | "positive";

    const BarGroup = ({
      type,
      children,
    }: {
      type: AreaType;
      children: Widget[];
    }) => {
      const flex = barGroupRatio[type];
      if (flex === 0) return SizedBox({ width: 0, height: 0 });

      return Flexible({
        flex,
        child: Flex({
          crossAxisAlignment:
            direction === "horizontal"
              ? CrossAxisAlignment.start
              : CrossAxisAlignment.end,
          direction: direction === "horizontal" ? "vertical" : "horizontal",
          children,
        }),
      });
    };

    const barGap = EdgeInsets.symmetric(
      direction === "horizontal"
        ? { vertical: gap / 2 }
        : { horizontal: gap / 2 }
    );

    const areas: AreaType[] =
      direction === "horizontal"
        ? ["negative", "positive"]
        : ["positive", "negative"];

    return Flex({
      direction,
      children: areas.map((type) =>
        BarGroup({
          type,
          children: [
            Spacer(),
            ...datasets.map(({ data, legend }, index) => {
              const value = data[this.props.index];
              const reverse = type === "negative";
              return Padding({
                padding: barGap,
                child: Stack({
                  children: [
                    Bar({
                      direction,
                      backgroundColor:
                        backgroundColors[index % backgroundColors.length],
                      index,
                      label,
                      legend,
                      value,
                      reverse,
                      ratio: barRatio[type](value),
                    }),
                  ],
                }),
              });
            }),
            Spacer(),
          ],
        })
      ),
    });
  }
}

export default (props: BarGroupProps) => new BarGroup(props);
