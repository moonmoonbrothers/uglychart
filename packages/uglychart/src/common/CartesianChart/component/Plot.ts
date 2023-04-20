import {
  ComponentWidget,
  Widget,
  BuildContext,
  Container,
} from "@moonmoonbrothers/flutterjs";
import { Scale } from "../types";
import { Plot as DefaultPlot } from "./default";
import { assert } from "@moonmoonbrothers/flutterjs/src/utils";
import CartesianChartContextWidget from "../CartesianChartContextWidget";

export type PlotProps = {
  direction: "vertical" | "horizontal";
  scale: Scale;
};

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

export class Plot extends CartesianChartContextWidget {
  
  constructor(private props: PlotProps) {
    super();
  }
  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { plot } = this.getCustom(context);
    if (plot.type === "custom") {
      return plot.Custom({}, { data, theme });
    }

    const {
      height,
      width,
      horizontalLine,
      verticalLine,
      backgroundAdditions = [],
      foregroundAdditions = [],
    } = plot;
    const { labels } = data;
    const { scale, direction } = this.props;

    const [labelLineCount, valueLineCount] = [
      labels.length,
      (scale.max - scale.min) / scale.step,
    ];

    assert(
      valueLineCount === Math.round(valueLineCount),
      "scale.max - scale.min must be divisible by scale.step"
    );

    return DefaultPlot({
      direction: direction,
      height: height,
      width: width,
      verticalLine: {
        thickness: verticalLine?.thickness ?? theme.border.width,
        color: verticalLine?.color ?? defaultPlotConfig.verticalLine.color,
        count: direction === "horizontal" ? valueLineCount : labelLineCount,
      },
      horizontalLine: {
        thickness: horizontalLine?.thickness ?? theme.border.width,
        color: horizontalLine?.color ?? defaultPlotConfig.horizontalLine.color,
        count: direction === "vertical" ? valueLineCount : labelLineCount,
      },
      BackgroundAdditions: foregroundAdditions,
      ForegroundAdditions: backgroundAdditions,
      child: Container({}),
    });
  }
}

export default (props: PlotProps) => new Plot(props);
