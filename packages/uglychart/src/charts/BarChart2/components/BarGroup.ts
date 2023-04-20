import {
  ComponentWidget,
  Widget,
  BuildContext,
} from "@moonmoonbrothers/flutterjs";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";
import { Scale } from "../util";
import Bar from "./Bar";
import { BarGroup as DefaultBarGroup } from "./default";
import DataLabel from "./DataLabel";

export type BarGroupProps = {
  direction: "vertical" | "horizontal";
  index: number;
  label: string;
  scale: Scale;
};

export type BarGroupConfig = {
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

    const values = datasets.map(({ data, legend }) => ({
      data: data[this.props.index],
      legend,
    }));

    const negativeBarRatios = values.map(({ data }) => {
      if (data > 0 || scale.min > 0) return 0;

      const max = -1 * scale.min;
      const min = Math.min(-1 * scale.max, 0);

      return (-1 * data - min) / (max - min);
    });
    const positiveBarRatios = values.map(({ data }) => {
      if (data < 0 || scale.max < 0) return 0;

      const max = scale.max;
      const min = Math.min(scale.min, 0);

      return (data - min) / (max - min);
    });

    return DefaultBarGroup({
      direction,
      gap,
      negativeAreaRatio: barGroupRatio.negative,
      positiveAreaRatio: barGroupRatio.positive,
      positiveBarRatios,
      negativeBarRatios,
      DataLabels: values.map(({ data, legend }, index) =>
        DataLabel({
          direction,
          index,
          legend,
          value: data,
          label,
        })
      ),

      Bars: values.map(({ data, legend }, index) =>
        Bar({
          value: data,
          direction,
          backgroundColor: backgroundColors[index % backgroundColors.length],
          index,
          label,
          legend,
        })
      ),
    });
  }
}

export default (props: BarGroupProps) => new BarGroup(props);
