import { Widget } from "@moonmoonbrothers/flutterjs";
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget";
import { Series as DefaultSeries } from "./default";
import { Series as BaseSeries } from "../../../common/CartesianChart/component/Series";
import type {Custom} from '../types'

export type SeriesConfig = {
};

export type SeriesProps = ConstructorParameters<typeof BaseSeries>


export class Series extends BaseSeries<Custom> {
  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { series } = this.getCustom(context);

    if (series.type === "custom") {
      return series.Custom({}, { theme, data });
    }

    const { scale, direction } = this.props;

    return DefaultSeries({
      scale,
      direction,
    });
  }
}

export default (...props: ConstructorParameters<typeof Series>) =>
  new Series(...props);
