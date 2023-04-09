import {
  Container,
  ComponentWidget,
  Widget,
  BoxDecoration,
  Border,
  BuildContext,
  Flex,
  MainAxisAlignment,
  OverflowBox,
} from "@moonmoonbrothers/flutterjs";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";
import { Scale } from "../types";
import BarGroup from "./BarGroup";

export type PlotProps = {
  direction: "vertical" | "horizontal";
  scale: Scale;
};

export type PlotConfig = {
  type: "config";
  width?: number;
  height?: number;
  border?: {
    width?: number;
    color?: string;
  };
  verticalLine?: {
    color?: string;
    width?: string;
    count?: number;
  };
  horizontalLine?: {
    color?: string;
    width?: string;
    count?: number;
  };
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
    const { height, width, horizontalLine, verticalLine } = plot;
    const { labels } = data;

    return Container({
      width: width,
      height: height,
      decoration: new BoxDecoration({
        border: Border.all({
          color: "black",
          width: 2,
        }),
      }),
      child: Flex({
        direction:
          this.props.direction === "vertical" ? "horizontal" : "vertical",
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: labels.map((label, index) =>
          Container({
            width: this.props.direction === "vertical" ? 2 : undefined,
            height: this.props.direction === "horizontal" ? 0 : undefined,
            child: OverflowBox({
              minWidth: 0,
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
  }
}

export default (props: PlotProps) => new Plot(props);
