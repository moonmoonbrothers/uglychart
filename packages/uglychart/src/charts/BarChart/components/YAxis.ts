import { Widget, BuildContext } from "@moonmoonbrothers/flutterjs";
import { YAxis as DefaultYAxis } from "./default";
import { YAxis as BaseYAxis } from "../../../common/CartesianChart/component/YAxis";

export type YAxisProps = {
  type: "index" | "value";
  labels: string[];
};

export const defaultYAxisConfig = {
  tick: {
    thickness: 2,
    length: 10,
  },
};

export class YAxis extends BaseYAxis {
  build(context: BuildContext): Widget {
    const { type } = this.props;
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { yAxis } = this.getCustom(context);
    const { YAxisLabel, YAxisTick } = this.getDependencies(context);

    if (yAxis.type === "custom") {
      return yAxis.Custom({ YAxisLabel, YAxisTick }, { theme, data });
    }

    const labels = this.props.labels.map((label, index) =>
      YAxisLabel({ index, text: label })
    );
    const ticks = this.props.labels.map((_, index) => YAxisTick({ index }));

    return DefaultYAxis({
      color: yAxis.color ?? theme.border.color,
      thickness: yAxis.thickness ?? theme.border.width,
      labels: type === "index" ? labels : labels.reverse(),
      ticks:
        type === "index"
          ? [...ticks, YAxisTick({ index: ticks.length })]
          : ticks,
    });
  }
}

export default (props: YAxisProps) => new YAxis(props);
