import { Widget } from "@moonmoonbrothers/flutterjs";
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget";
import { Series as DefaultSeries } from "./default";
import type { Custom, Dependencies } from "../types";
import CartesianChartContextWidget from "../../../common/CartesianChart/CartesianChartContextWidget";

export type SeriesConfig = {};

export type SeriesProps = {
  direction: "horizontal" | "vertical";
};

export class Series extends CartesianChartContextWidget<Custom, Dependencies> {
  constructor(protected props: SeriesProps = { direction: "vertical" }) {
    super();
  }
  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { labels } = data;
    const { series } = this.getCustom(context);
    const { BarGroup } = this.getDependencies(context);

    if (series.type === "custom") {
      return series.Custom({}, { theme, data });
    }

    const { direction } = this.props;
    const scale = this.getScale(context);

    return DefaultSeries({
      scale,
      direction,
      children: labels.map((label, index) =>
        BarGroup({
          index,
          scale: scale,
          label,
          direction: this.props.direction,
        })
      ),
    });
  }
}

export default (...props: ConstructorParameters<typeof Series>) =>
  new Series(...props);
