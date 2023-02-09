import {
  Container,
  Alignment,
  Text,
  ComponentWidget,
  Widget,
  BorderStyle,
  Column,
  Flexible,
  Row,
} from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { CustomProvider, DataProvider, ThemeProvider } from "../provider"
import BarGroup from "./BarGroup"

export type PlotProps = {
  direction: "vertical" | "horizontal"
}

class Plot extends ComponentWidget {
  constructor(private props: PlotProps) {
    super()
  }
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context)
    const data = DataProvider.of(context)
    const { plot } = CustomProvider.of(context)
    if (plot.type === "custom") {
      return plot.Custom(
        {
          BarGroup,
        },
        { data, theme }
      )
    }
    const { height, width, horizontalLine, verticalLine } = plot
    const { labels } = data

    return Container({
      width: width ?? Infinity,
      height: height ?? Infinity,
      border: BorderStyle.all({ color: "black", thickness: 2 }),
      child: (this.props.direction === "horizontal" ? Column : Row)({
        children: [
          Flexible({ flex: 0.5 }),
          ...labels.map((label, index) =>
            Flexible({
              child: BarGroup({
                index,
                label,
                direction: this.props.direction,
              }),
            })
          ),
          Flexible({ flex: 0.5 }),
        ],
      }),
    })
  }
}

export default (props: PlotProps) => new Plot(props)
