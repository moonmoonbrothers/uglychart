import { ComponentWidget, Row, Widget } from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { CustomProvider, DataProvider, ThemeProvider } from "../provider"

class XAxisScale extends ComponentWidget {
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context)
    const data = DataProvider.of(context)
    const { xAxisScale } = CustomProvider.of(context)
    if (xAxisScale.type === "custom") {
      return xAxisScale.Custom({}, { data, theme })
    }

    return Row({
      children: [],
    })
  }
}

export default () => new XAxisScale()
