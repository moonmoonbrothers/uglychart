import {
  Column,
  ComponentWidget,
  Container,
  Flexible,
  Row,
  Widget,
} from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import {
  CustomProvider as CustomProvider,
  DataProvider,
  ThemeProvider,
} from "../provider"

type BarProps = {
  color: string
  index: number
  minValue: number
  maxValue: number
  value: number
  label: string
  legend: string
}
export class Bar extends ComponentWidget {
  constructor(private props: BarProps) {
    super()
  }

  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context)
    const data = DataProvider.of(context)
    const { bar, xAxis } = CustomProvider.of(context)

    const { color, index, label, minValue, maxValue, value, legend } =
      this.props

    if (bar.type === "custom") {
      return bar.Custom(
        {},
        {
          color,
          index,
          minValue,
          maxValue,
          value,
          theme,
          label,
          legend,
          data,
        }
      )
    }

    const { thickness } = bar

    //   const horizontal = xAxis.axis === "data"

    const barRatio = (value - minValue) / (maxValue - minValue)

    return Row({
      children: [
        Flexible({
          flex: barRatio,
          child: Container({
            color,
            width: Infinity,
            height: thickness,
          }),
        }),
        Flexible({ flex: 1 - barRatio || 0.0001 }),
      ],
    })
  }
}

export default (props: BarProps) => new Bar(props)
