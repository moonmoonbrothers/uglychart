import {
  Widget,
  BuildContext,
  Center,
  Text,
} from "@moonmoonbrothers/flutterjs";
import CartesianChartContextWidget from "../CartesianChartContextWidget";
import { Scale } from "../util";
import { Custom } from "../types";

export type SeriesProps = {
  scale: Scale;
  direction: "horizontal" | "vertical";
};

export type SeriesConfig = {};

export class Series<
  CUSTOM extends Custom = Custom
> extends CartesianChartContextWidget<CUSTOM> {
  constructor(protected props: SeriesProps) {
    super();
  }
  build(context: BuildContext): Widget {
    const data = this.getData(context);
    const theme = this.getTheme(context);
    const { series } = this.getCustom(context);

    if (series.type === "custom") {
      return series.Custom({}, { theme, data });
    }

    return Center({
      child: Text("You must implement Series"),
    });
  }
}

export default (props: SeriesProps) => new Series(props);
