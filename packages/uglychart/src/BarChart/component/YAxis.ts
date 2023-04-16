import {
  ComponentWidget,
  Widget,
  BuildContext,
} from "@moonmoonbrothers/flutterjs";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";
import YAxisLabel from "./YAxisLabel";
import YAxisTick from "./YAxisTick";
import { YAxis as DefaultYAxis } from "./default";

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

class YAxis extends ComponentWidget {
  constructor(private props: YAxisProps) {
    super();
  }

  build(context: BuildContext): Widget {
    const { type } = this.props;
    const theme = ThemeProvider.of(context);
    const data = DataProvider.of(context);
    const { yAxis } = CustomProvider.of(context);

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
      labels,
      ticks:
        type === "index"
          ? [...ticks, YAxisTick({ index: ticks.length })]
          : ticks,
    });
  }
}

export default (props: YAxisProps) => new YAxis(props);
