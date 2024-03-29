import { Widget, BuildContext } from "@moonmoonbrothers/flutterjs";
import { XAxis as DefaultXAxis } from "./default";
import { XAxis as BaseXAxis } from "../../../common/CartesianChart/component/XAxis";

export class XAxis extends BaseXAxis {
  build(context: BuildContext): Widget {
    const { type } = this.props;
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
      ticks:
        type === "index"
          ? [...ticks, XAxisTick({ index: ticks.length })]
          : ticks,
    });
  }
}

export default (...props: ConstructorParameters<typeof XAxis>) =>
  new XAxis(...props);
