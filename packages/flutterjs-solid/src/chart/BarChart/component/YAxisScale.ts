import { Column, ComponentWidget, Widget } from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { CustomProvider, DataProvider, ThemeProvider } from "../provider"

class YAxisScale extends ComponentWidget {

  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context)
    const data = DataProvider.of(context)
    const { yAxisScale } = CustomProvider.of(context)
    if (yAxisScale.type === "custom") {
      return yAxisScale.Custom({}, { data, theme })
    }

    return Column({
      children: [],
    })
  }
}

export default () => new YAxisScale()
