import {
  Column,
  ComponentWidget,
  Row,
  Widget,
} from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { CustomProvider, DataProvider, ThemeProvider } from "../provider"
import XAxisLabel from "./XAxisLabel"
import XAxisScale from "./XAxisScale"

class XAxis extends ComponentWidget {
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context)
    const { labels, datasets } = DataProvider.of(context)
    const { xAxis } = CustomProvider.of(context)

    if (xAxis.type === "custom") {
      return xAxis.Custom({ XAxisLabel, XAxisScale }, { theme })
    }

    return Column({
      children: [
        Row({
          children: [],
        }),
        XAxisScale()
      ],
    })
  }
}

export default () => new XAxis()
