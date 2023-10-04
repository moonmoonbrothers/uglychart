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
    const { DataLabel, Bar, Tooltip } = this.getDependencies(context);

    if (barGroup.type === "custom") {
      return barGroup.Custom(
        { Bar, DataLabel, Tooltip },
        { theme, data, scale, direction }
      );
    }

    const { gap = 2 } = barGroup;
    const datasets = this.getDatasets(context);

    const values = datasets
      .filter(({ visible }) => visible)
      .map(({ data, legend, color }) => ({
        data: data[this.props.index] as number,
        legend,
        color,
      }));

    return DefaultBarGroup({
      direction,
      gap,
      values,
      minValue: scale.min,
      maxValue: scale.max,
      Bar,
      Tooltip,
      DataLabel,
      label,
    });
  }
}

export default (props: BarGroupProps) => new BarGroup(props);
