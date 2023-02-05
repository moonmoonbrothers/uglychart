import {
  Container,
  Alignment,
  Text,
  ComponentWidget,
  Widget,
  BorderStyle,
  Column,
  Flexible,
} from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { CustomProvider, DataProvider, ThemeProvider } from "../provider"
import BarGroup from "./BarGroup"

class Plot extends ComponentWidget {
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context)
    const data = DataProvider.of(context)
    const { plot, xAxis } = CustomProvider.of(context)
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

    // horizontal로  가정

    return Container({
      width: width ?? Infinity,
      height: height ?? Infinity,
      border: BorderStyle.all({ color: "black", thickness: 2 }),
      child: Column({
        children: [
          Flexible({ flex: 0.5 }),
          ...labels.map((label, index) =>
            Flexible({
              child: BarGroup({ index, label }),
            })
          ),
          Flexible({ flex: 0.5 }),
        ],
      }),
    })
  }
}

export default () => new Plot()
