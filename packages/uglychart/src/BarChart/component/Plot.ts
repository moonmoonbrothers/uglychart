import {
  Container,
  ComponentWidget,
  Widget,
  BuildContext,
  Flex,
  MainAxisAlignment,
  OverflowBox,
  Axis,
  Alignment,
} from "@moonmoonbrothers/flutterjs";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";
import { Scale } from "../types";
import BarGroup from "./BarGroup";
import { Plot as DefaultPlot } from "./default";
import { assert } from "@moonmoonbrothers/flutterjs/src/utils";

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

class Plot extends ComponentWidget {
  constructor(private props: PlotProps) {
    super();
  }
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context);
    const data = DataProvider.of(context);
    const { plot } = CustomProvider.of(context);
    if (plot.type === "custom") {
      return plot.Custom(
        {
          BarGroup,
        },
        { data, theme }
      );
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
      BarGroups: labels.map((label, index) =>
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

export default (props: PlotProps) => new Plot(props);
