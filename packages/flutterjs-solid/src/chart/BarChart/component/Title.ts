import {
  ComponentWidget,
  Padding,
  Row,
  Text,
  Widget,
} from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { CustomProvider, DataProvider, ThemeProvider } from "../provider"

class Title extends ComponentWidget {
  build(context: BuildContext): Widget {
    const { title: text = "" } = DataProvider.of(context)
    const theme = ThemeProvider.of(context)
    const { title } = CustomProvider.of(context)

    if (title.type === "custom") {
      return title.Custom({}, { theme, text })
    }

    const { alignment, font = theme.text, margin } = title
    return Row({
      mainAxisAlignment: alignment === "center" ? "spaceEvenly" : alignment,
      children: [
        Padding({
          padding: margin,
          child: Text(text, font),
        }),
      ],
    })
  }
}

export default () => new Title()
