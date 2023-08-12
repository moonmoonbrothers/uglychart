import { Widget, BuildContext, Container } from "@moonmoonbrothers/flutterjs";
import { Scale } from "../types";
import { Plot as DefaultPlot } from "./default";
import { assert } from "@moonmoonbrothers/flutterjs/src/utils";
import CartesianChartContextWidget from "../CartesianChartContextWidget";

export type PlotProps = {};

export type PlotConfig = {
  width?: number;
  height?: number;
  verticalLine?: PlotLine;
  horizontalLine?: PlotLine;
  backgroundAdditions?: Widget[];
  foregroundAdditions?: Widget[];
};

type PlotLine = {
  color?: string;
  thickness?: number;
  count?: number;
};

export class Plot extends CartesianChartContextWidget {
  constructor(protected props: PlotProps = {}) {
    super();
  }
  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { plot } = this.getCustom(context);
    if (plot.type === "custom") {
      return plot.Custom({}, { data, theme });
    }
    const { Series } = this.getDependencies(context);

    const {
      height,
      width,
      horizontalLine,
      verticalLine,
      backgroundAdditions = [],
      foregroundAdditions = [],
    } = plot;
    const { labels } = data;
    const scale = this.getScale(context);

    const [labelLineCount, valueLineCount] = [
      labels.length - 1,
      (scale.max - scale.min) / scale.step,
    ];

    assert(
      valueLineCount === Math.round(valueLineCount),
      "scale.max - scale.min must be divisible by scale.step"
    );

    return DefaultPlot({
      height: height,
      width: width,
      verticalLine: {
        thickness: verticalLine?.thickness ?? theme.border.width,
        color: verticalLine?.color,
        count: labelLineCount,
      },
      horizontalLine: {
        thickness: horizontalLine?.thickness ?? theme.border.width,
        color: horizontalLine?.color,
        count: valueLineCount,
      },
      BackgroundAdditions: foregroundAdditions,
      ForegroundAdditions: backgroundAdditions,
      child: Series(),
    });
  }
}

export default (props: PlotProps) => new Plot(props);
