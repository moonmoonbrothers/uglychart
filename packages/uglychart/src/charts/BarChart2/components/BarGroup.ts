import { Widget, BuildContext, SizedBox } from "@moonmoonbrothers/flutterjs";
import Bar from "./Bar";
import { BarGroup as DefaultBarGroup } from "./default";
import { Scale } from "../../../common/CartesianChart/types";
import CartesianChartContextWidget from "../../../common/CartesianChart/CartesianChartContextWidget";
import type { Custom } from "../types";

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

class BarGroup extends CartesianChartContextWidget<Custom> {
  constructor(private props: BarGroupProps) {
    super();
  }
  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { barGroup } = this.getCustom(context);
    const { scale, direction, label } = this.props;

    if (barGroup.type === "custom") {
      return barGroup.Custom({ Bar }, { theme, data, scale, direction });
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
      DataLabels: values.map(
        ({ data, legend }, index) => SizedBox.shrink()
        // DataLabel({
        //   direction,
        //   index,
        //   legend,
        //   value: data,
        //   label,
        // })
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
