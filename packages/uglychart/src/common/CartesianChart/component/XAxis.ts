import { Widget, BuildContext } from "@moonmoonbrothers/flutterjs";
import { XAxis as DefaultXAxis } from "./default";
import CartesianChartContextWidget from "../CartesianChartContextWidget";

export type XAxisProps = {
  type: "index" | "value";
  labels: string[];
};

export class XAxis extends CartesianChartContextWidget {
  constructor(protected props: XAxisProps) {
    super();
  }

  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { xAxis } = this.getCustom(context);
    const { XAxisLabel, XAxisTick } = this.getDependencies(context);

    if (xAxis.type === "custom") {
      return xAxis.Custom({ XAxisLabel, XAxisTick }, { theme, data });
    }

    const labels = this.props.labels.map((label, index) =>
      XAxisLabel({ index, text: label })
    );
    const ticks = this.props.labels.map((_, index) => XAxisTick({ index }));

    return DefaultXAxis({
      color: xAxis.color ?? theme.border.color,
      thickness: xAxis.thickness ?? theme.border.width,
      labels,
      ticks,
    });
  }
}

export default (props: XAxisProps) => new XAxis(props);
