import {
  Container,
  Alignment,
  Text,
  ComponentWidget,
  Widget,
} from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { CustomProvider, DataProvider, ThemeProvider } from "../provider"
import BarGroup from "./BarGroup"

class Plot extends ComponentWidget {
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

    const { border, height, width, horizontalLine, verticalLine } = plot
    return Container({
      width: width ?? Infinity,
      height: height ?? Infinity,
      border,
      color: "red",
    })
  }
}

export default () => new Plot()
