import { Widget } from "@moonmoonbrothers/flutterjs";
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget";
import { Series as DefaultSeries } from "./default";
import { Series as BaseSeries } from "../../../common/CartesianChart/component/Series";
import type { Custom } from "../types";
import Line from "./Line";
import { defaultColors } from "../../../utils";

export type SeriesConfig = {
  lineColors?: string[];
};

export type SeriesProps = ConstructorParameters<typeof BaseSeries>;

export class Series extends BaseSeries<Custom> {
  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { datasets } = data;
    const { series } = this.getCustom(context);

    if (series.type === "custom") {
      return series.Custom({}, { theme, data });
    }

    const { lineColors = defaultColors } = series;

    const scale = this.getScale(context);

    return DefaultSeries({
      children: datasets.map(({ data: values }, i) =>
        Line({
          values,
          color: lineColors[i % lineColors.length],
          maxValue: scale.max,
          minValue: scale.min,
        })
      ),
    });
  }
}

export default (...props: ConstructorParameters<typeof Series>) =>
  new Series(...props);
