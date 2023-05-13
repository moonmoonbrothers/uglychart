import { BuildContext, type Widget } from "@moonmoonbrothers/flutterjs";
import { YAxisTick as DefaultYAxisTick } from "./default";
import CartesianChartContextWidget from "../CartesianChartContextWidget";

export class YAxisTick extends CartesianChartContextWidget {
  index: number;
  constructor({ index }: YAxisTickProps) {
    super();
    this.index = index;
  }
  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { yAxis, yAxisTick } = this.getCustom(context);

    if (yAxisTick.type === "custom") {
      return yAxisTick.Custom({}, { theme, data, index: this.index });
    }

    return DefaultYAxisTick({
      thickness: yAxisTick.thickness ?? yAxis.thickness ?? theme.border.width,
      length: yAxisTick.length ?? 10,
      color: yAxisTick.color ?? yAxis.color ?? theme.border.color,
    });
  }
}

export type YAxisTickProps = {
  index: number;
};

export default (props: YAxisTickProps) => new YAxisTick(props);
