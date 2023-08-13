import { Widget } from "@moonmoonbrothers/flutterjs";
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget";
import { Series as DefaultSeries } from "./default";
import { Series as BaseSeries } from "../../../common/CartesianChart/component/Series";
import type { Custom } from "../types";
import Line from "./Line";
import { defaultColors } from "../../../utils";
import { SeriesConfig as BaseSeriesConfig } from "../../../common/CartesianChart/component/Series";

export type SeriesConfig = BaseSeriesConfig;

export type SeriesProps = ConstructorParameters<typeof BaseSeries>;

export class Series extends BaseSeries<Custom> {
  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const datasets = this.getVisibleDatasets(context);
    const { series } = this.getCustom(context);

    if (series.type === "custom") {
      return series.Custom({}, { theme, data });
    }

    const { colors: lineColors = defaultColors } = series;

    const scale = this.getScale(context);

    return DefaultSeries({
      children: datasets.map(({ data: values, color }, i) =>
        Line({
          values,
          color,
          maxValue: scale.max,
          minValue: scale.min,
        })
      ),
    });
  }
}

export default (...props: ConstructorParameters<typeof Series>) =>
  new Series(...props);
