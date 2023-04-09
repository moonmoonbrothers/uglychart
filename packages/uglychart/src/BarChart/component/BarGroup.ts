import {
  ComponentWidget,
  EdgeInsets,
  Padding,
  Widget,
  BuildContext,
  CrossAxisAlignment,
  Flex,
  MainAxisSize,
  Expanded,
  Alignment,
  FractionallySizedBox,
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

export type BarGroupConfig = {
  type: "config";
  barBackgroundColors?: string[];
  barBorderColors?: string[];
  gap?: number;
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

    const Bars = ({
      type,
      children,
    }: {
      type: AreaType;
      children: Widget[];
    }) => {
      const flex = barGroupRatio[type];

      return Expanded({
        flex,
        child: Flex({
          mainAxisSize: MainAxisSize.min,
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

    const getBarAlignment = (
      type: AreaType,
      direction: "vertical" | "horizontal"
    ) => {
      if (type === "negative") {
        if (direction === "vertical") {
          return Alignment.topLeft;
        } else {
          return Alignment.topRight;
        }
      } else {
        if (direction === "vertical") {
          return Alignment.bottomLeft;
        } else {
          return Alignment.bottomLeft;
        }
      }
    };

    return Flex({
      direction,
      children: areas.map((type) =>
        Expanded({
          flex: barGroupRatio[type],
          child: Flex({
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.end,
            direction: direction === "horizontal" ? "vertical" : "horizontal",
            children: datasets.map(({ data, legend }, index) => {
              const value = data[this.props.index];
              const ratio = barRatio[type](value);
              return Padding({
                padding: barGap,
                child: FractionallySizedBox({
                  alignment: getBarAlignment(type, direction),
                  widthFactor: direction === "horizontal" ? ratio : undefined,
                  heightFactor: direction === "vertical" ? ratio : undefined,
                  child: Bar({
                    direction,
                    backgroundColor:
                      backgroundColors[index % backgroundColors.length],
                    index,
                    label,
                    legend,
                    value,
                    reverse: type === "negative",
                  }),
                }),
              });
            }),
          }),
        })
      ),
    });
  }
}

export default (props: BarGroupProps) => new BarGroup(props);
