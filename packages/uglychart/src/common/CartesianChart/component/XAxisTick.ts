import { BuildContext, type Widget } from "@moonmoonbrothers/flutterjs";
import { XAxisTick as DefaultXAxisTick } from "./default";
import CartesianChartContextWidget from "../CartesianChartContextWidget";

export class XAxisTick extends CartesianChartContextWidget {
  index: number;
  constructor({ index }: XAxisTickProps) {
    super();
    this.index = index;
  }
  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { xAxis, xAxisTick } = this.getCustom(context);

    if (xAxisTick.type === "custom") {
      return xAxisTick.Custom({}, { theme, data, index: this.index });
    }

    return DefaultXAxisTick({
      thickness: xAxisTick.thickness ?? xAxis.thickness ?? theme.border.width,
      length: xAxisTick.length ?? 5,
      color: xAxisTick.color ?? xAxis.color ?? theme.border.color,
    });
  }
}

export type XAxisTickProps = {
  index: number;
};

export default (props: XAxisTickProps) => new XAxisTick(props);
