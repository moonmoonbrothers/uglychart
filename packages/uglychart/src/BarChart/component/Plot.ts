import {
  Container,
  ComponentWidget,
  Widget,
  Flexible,
  BoxDecoration,
  Border,
  BuildContext,
  Spacer,
  Flex,
  Alignment,
} from "@moonmoonbrothers/flutterjs";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";
import { Scale } from "../types";
import BarGroup from "./BarGroup";

export type PlotProps = {
  direction: "vertical" | "horizontal";
  scale: Scale;
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
      width: width ?? Infinity,
      height: height ?? Infinity,
      decoration: new BoxDecoration({
        border: Border.all({
          color: "black",
          width: 2,
        }),
      }),
      alignment: Alignment.topLeft,
      child: Flex({
        direction:
          this.props.direction === "vertical" ? "horizontal" : "vertical",
        children: [
          Spacer({ flex: 0.5 }),
          ...labels
            .map((label, index) => [
              Flexible({
                child: BarGroup({
                  index,
                  scale: this.props.scale,
                  label,
                  direction: this.props.direction,
                }),
              }),
            ])
            .flat(),
          Spacer({ flex: 0.5 }),
        ],
      }),
    });
  }
}

export default (props: PlotProps) => new Plot(props);
