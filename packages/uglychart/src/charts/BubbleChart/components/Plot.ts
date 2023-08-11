import { Widget, BuildContext, Container } from "@moonmoonbrothers/flutterjs";
import { Plot as DefaultPlot } from "./default";
import type { Custom, Dependencies, Data, Scale, Theme } from "../types";
import ChartContextWidget from "../../../common/ChartContextWidget";

export type PlotProps = {};

export type PlotConfig = {
  width?: number;
  height?: number;
  verticalLine?: PlotLine;
  horizontalLine?: PlotLine;
  backgroundAdditions?: Widget[];
  foregroundAdditions?: Widget[];
};

const defaultPlotConfig = {
  verticalLine: {
    color: "#D3D3D3",
  },
  horizontalLine: {
    color: "#D3D3D3",
  },
};

type PlotLine = {
  color?: string;
  thickness?: number;
  count?: number;
};

export class Plot extends ChartContextWidget<
  Custom,
  Dependencies,
  Theme,
  Data,
  Scale
> {
  constructor(protected props: PlotProps) {
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
    const scale = this.getScale(context);

    const [defaultHorizontalLineCount, defaultVerticalLineCount] = [
      (scale.y.max - scale.y.min) / scale.y.step,
      (scale.x.max - scale.x.min) / scale.x.step,
    ];

    return DefaultPlot({
      height: height,
      width: width,
      verticalLine: {
        thickness: verticalLine?.thickness ?? theme.border.width,
        color: verticalLine?.color ?? defaultPlotConfig.verticalLine.color,
        count: verticalLine?.count ?? defaultVerticalLineCount,
      },
      horizontalLine: {
        thickness: horizontalLine?.thickness ?? theme.border.width,
        color: horizontalLine?.color ?? defaultPlotConfig.horizontalLine.color,
        count: horizontalLine?.count ?? defaultHorizontalLineCount,
      },
      BackgroundAdditions: foregroundAdditions,
      ForegroundAdditions: backgroundAdditions,
      child: Series(),
    });
  }
}

export default (props: PlotProps) => new Plot(props);
