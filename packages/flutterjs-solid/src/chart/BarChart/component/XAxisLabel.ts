import {
  ComponentWidget,
  Padding,
  Text,
  Widget,
} from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { CustomProvider, ThemeProvider } from "../provider"

type XAxisLabelProps = {
  index: number
  text: string
}

class XAxisLabel extends ComponentWidget {
  constructor(private props: XAxisLabelProps) {
    super()
  }
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context)
    const { xAxisLabel } = CustomProvider.of(context)

    const { text, index } = this.props
    if (xAxisLabel.type === "custom") {
      return xAxisLabel.Custom({}, { theme, text, index })
    }
    const { font, margin } = xAxisLabel

    return Padding({
      padding: margin,
      child: Text(text, { ...theme.text, ...font }),
    })
  }
}

export default (props: XAxisLabelProps) => new XAxisLabel(props)
