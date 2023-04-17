import {
  Container,
  ComponentWidget,
  Widget,
  BuildContext,
  Flex,
  MainAxisAlignment,
  OverflowBox,
  Stack,
  Axis,
  Alignment,
} from "@moonmoonbrothers/flutterjs";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";
import { Scale } from "../types";
import BarGroup from "./BarGroup";

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

    const Plot = () =>
      Container({
        width: width,
        height: height,
        alignment: Alignment.center,
        child: Flex({
          direction:
            this.props.direction === "vertical"
              ? Axis.horizontal
              : Axis.vertical,
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: labels.map((label, index) =>
            Container({
              width: this.props.direction === "vertical" ? 0 : undefined,
              height: this.props.direction === "horizontal" ? 0 : undefined,
              child: OverflowBox({
                maxWidth:
                  this.props.direction === "vertical" ? Infinity : undefined,
                maxHeight:
                  this.props.direction === "horizontal" ? Infinity : undefined,
                child: BarGroup({
                  index,
                  scale: this.props.scale,
                  label,
                  direction: this.props.direction,
                }),
              }),
            })
          ),
        }),
      });

    return Stack({
      children: [...backgroundAdditions, Plot(), ...foregroundAdditions],
    });
  }
}

export default (props: PlotProps) => new Plot(props);
