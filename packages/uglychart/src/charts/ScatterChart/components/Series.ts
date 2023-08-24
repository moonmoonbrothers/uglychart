import { Opacity, Widget } from "@moonmoonbrothers/flutterjs";
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget";
import { Series as DefaultSeries } from "./default";
import type { Custom, Dependencies, Data, Scale, Theme } from "../types";
import Scatter from "./Scatter";
import { SeriesConfig as BaseSeriesConfig } from "../../../common/CartesianChart/component/Series";
import CartesianChartContextWidget from "../../../common/CartesianChart/CartesianChartContextWidget";

export type SeriesConfig = BaseSeriesConfig;

export type SeriesProps = {};

export class Series extends CartesianChartContextWidget<
  Custom,
  Dependencies,
  Theme,
  Data,
  Scale
> {
  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const datasets = this.getDatasets(context);
    const { series } = this.getCustom(context);

    if (series.type === "custom") {
      return series.Custom({}, { theme, data });
    }

    return DefaultSeries({
      children: datasets.map(({ data: values, color, visible }, i) =>
        Opacity({
          opacity: visible ? 1 : 0,
          child: Scatter({
            color,
            points: values,
          }),
        })
      ),
    });
  }
}

export default (...props: ConstructorParameters<typeof Series>) =>
  new Series(...props);
