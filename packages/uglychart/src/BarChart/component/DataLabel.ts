import {
  ComponentWidget,
  Container,
  Positioned,
  Text,
  Widget,
  BuildContext
} from "@moonmoonbrothers/flutterjs"
import {
  CustomProvider as CustomProvider,
  DataProvider,
  ThemeProvider,
} from "../provider"

export type DataLabelProps = {
  index: number
  value: number
  reverse?: boolean
  label: string
  legend: string
  direction: "horizontal" | "vertical"
}
export class DataLabel extends ComponentWidget {
  constructor(private props: DataLabelProps) {
    super()
  }

  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context)
    const data = DataProvider.of(context)
    const { dataLabel } = CustomProvider.of(context)
    const {
      direction,
      value,
      reverse = false,
      label,
      legend,
      index,
    } = this.props

    if (dataLabel.type === "custom") {
      return dataLabel.Custom(
        {},
        { value, index, label, direction, data, theme, legend, reverse }
      )
    }

    return Positioned({
      child: Container({
        child: Text(``, {}),
      }),
    })
  }
}

export default (props: DataLabelProps) => new DataLabel(props)
