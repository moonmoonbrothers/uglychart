import { Widget, BuildContext } from "@moonmoonbrothers/flutterjs";
import { BarGroup as DefaultBarGroup } from "./default";
import { Scale } from "../../../common/CartesianChart/types";
import CartesianChartContextWidget from "../../../common/CartesianChart/CartesianChartContextWidget";
import type { Custom, Data, Dependencies, Theme } from "../types";

export type BarGroupProps = {
  direction: "vertical" | "horizontal";
  index: number;
  label: string;
  scale: Scale;
};

export type BarGroupConfig = {
  gap?: number;
};

class BarGroup extends CartesianChartContextWidget<
  Custom,
  Dependencies,
  Theme,
  Data
> {
  constructor(private props: BarGroupProps) {
    super();
  }
  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { barGroup } = this.getCustom(context);
    const { scale, direction, label } = this.props;
    const { DataLabel, Bar } = this.getDependencies(context);

    if (barGroup.type === "custom") {
      return barGroup.Custom({ Bar }, { theme, data, scale, direction });
    }

    const { gap = 2 } = barGroup;
    const datasets = this.getVisibleDatasets(context);

    const barGroupRatio = {
      negative: scale.min > 0 ? 0 : (0 - scale.min) / (scale.max - scale.min),
      positive: scale.max < 0 ? 0 : (scale.max - 0) / (scale.max - scale.min),
    };

    const values = datasets.map(({ data, legend, color }) => ({
      data: data[this.props.index],
      legend,
      color,
    }));

    const negativeBarRatios = values.map(({ data }) => {
      if (data > 0 || scale.min > 0) return 0;

      const max = -1 * scale.min;
      const min = Math.max(-1 * scale.max, 0);

      return (-1 * data - min) / (max - min);
    });
    const positiveBarRatios = values.map(({ data }) => {
      if (data < 0 || scale.max < 0) return 0;

      const max = scale.max;
      const min = Math.max(scale.min, 0);

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
          index,
          legend,
          value: data,
          label,
        })
      ),

      Bars: values.map(({ data, legend, color }, index) =>
        Bar({
          value: data,
          direction,
          backgroundColor: color,
          index,
          label,
          legend,
        })
      ),
    });
  }
}

export default (props: BarGroupProps) => new BarGroup(props);
