import { SizedBox, Widget } from "@moonmoonbrothers/flutterjs";
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget";
import { Series as DefaultSeries } from "./default";
import type { Custom, Dependencies, Data, Scale, Theme } from "../types";
import ChartContextWidget from "../../../common/ChartContextWidget";

export type SeriesConfig = {
  dotColors?: string[];
};

export type SeriesProps = {
  direction: "horizontal" | "vertical";
};

export class Series extends ChartContextWidget<
  Custom,
  Dependencies,
  Theme,
  Data,
  Scale
> {

  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { datasets } = data;
    const { series } = this.getCustom(context);

    if (series.type === "custom") {
      return series.Custom({}, { theme, data });
    }

    const { dotColors = ["black"] } = series;

    const scale = this.getScale(context);

    return DefaultSeries({
      children: datasets.map(({ data: values }, i) => SizedBox.shrink()),
    });
  }
}

export default (...props: ConstructorParameters<typeof Series>) =>
  new Series(...props);
