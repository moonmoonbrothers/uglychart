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

export type PlotProps = {
  direction: "vertical" | "horizontal";
  scale: Scale;
};

export type PlotConfig = {
  width?: number;
  height?: number;
  verticalLine?: {
    color?: string;
    width?: string;
    getCount?: (xLabelCount: number) => number;
  };
  horizontalLine?: {
    color?: string;
    width?: string;
    getCount?: (yLabelCount: number) => number;
  };
  backgroundAdditions?: Widget[];
  foregroundAdditions?: Widget[];
};

class Plot extends ComponentWidget {
  constructor(private props: PlotProps) {
    super();
  }
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context);
    const data = DataProvider.of(context);
    const { plot, yAxis, xAxis } = CustomProvider.of(context);
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

    return DefaultPlot({
      direction: this.props.direction,
      height: plot.height,
      width: plot.width,
      BackgroundAdditions: foregroundAdditions,
      ForegroundAdditions: backgroundAdditions,
      BarGroups: labels.map((label, index) =>
        BarGroup({
          index,
          scale: this.props.scale,
          label,
          direction: this.props.direction,
        })
      ),
    });
  }
}

export default (props: PlotProps) => new Plot(props);
