import {
  Alignment,
  Column,
  ComponentWidget,
  Container,
  Flexible,
  Widget,
} from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import Title from "./Title"
import Chart from "./Chart"
import { CustomProvider, ThemeProvider } from "../provider"

class Layout extends ComponentWidget {
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context)
    const { layout } = CustomProvider.of(context)
    if (layout.type === "custom")
      return layout.Custom({ Title, Chart }, { theme })

    const { padding } = layout
    return Container({
      width: Infinity,
      height: Infinity,
      padding,
      alignment: Alignment.topLeft,
      child: Column({
        children: [
          Title(),
          Flexible({
            child: Chart(),
          }),
        ],
      }),
    })
  }
}

export default () => new Layout()
