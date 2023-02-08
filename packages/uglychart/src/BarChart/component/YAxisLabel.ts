import {
  ComponentWidget,
  Container,
  Padding,
  Text,
  Widget,
} from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { CustomProvider, ThemeProvider } from "../provider"

type YAxisLabelProps = {
  index: number
  text: string
}

class YAxisLabel extends ComponentWidget {
  constructor(private props: YAxisLabelProps) {
    super()
  }
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context)
    const { yAxisLabel } = CustomProvider.of(context)

    const { text, index } = this.props
    if (yAxisLabel.type === "custom") {
      return yAxisLabel.Custom({}, { theme, text, index })
    }
    const { font, margin } = yAxisLabel

    return Padding({
      padding: margin,
      child: Text(text, { ...theme.text, ...font }),
    })
  }
}

export default (props: YAxisLabelProps) => new YAxisLabel(props)
