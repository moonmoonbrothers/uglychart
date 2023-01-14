import {
  Column,
  ComponentWidget,
  Container,
  Row,
  Widget,
} from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { children } from "solid-js"
import { CustomProvider, DataProvider, ThemeProvider } from "../provider"
import YAxisLabel from "./YAxisLabel"
import YAxisScale from "./YAxisScale"

class YAxis extends ComponentWidget {
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context)
    const { labels, datasets } = DataProvider.of(context)
    const { yAxis } = CustomProvider.of(context)

    if (yAxis.type === "custom") {
      return yAxis.Custom({ YAxisLabel, YAxisScale }, { theme })
    }

    return Row({
      children: [
        Column({
          children: [],
        }),
        YAxisScale()
      ],
    })
  }
}

export default () => new YAxis()
