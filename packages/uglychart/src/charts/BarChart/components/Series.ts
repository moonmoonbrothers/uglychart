import { Widget } from "@moonmoonbrothers/flutterjs";
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget";
import { Series as DefaultSeries } from "./default";
import { Series as BaseSeries } from "../../../common/CartesianChart/component/Series";
import type { Custom } from "../types";
import BarGroup from "./BarGroup";

export type SeriesConfig = {};

export type SeriesProps = {
  direction: "horizontal" | "vertical";
};

export class Series extends BaseSeries<Custom> {
  declare props: SeriesProps;
  constructor(props: SeriesProps) {
    super(props);
    this.props = props;
  }
  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { labels } = data;
    const { series } = this.getCustom(context);

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
