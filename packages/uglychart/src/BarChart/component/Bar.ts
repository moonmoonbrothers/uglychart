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
  backgroundColor: string
  index: number
  ratio: number
  label: string
  legend: string
  direction: "horizontal" | "vertical"
}
export class Bar extends ComponentWidget {
  constructor(private props: BarProps) {
    super()
  }

  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context)
    const data = DataProvider.of(context)
    const { bar, xAxis } = CustomProvider.of(context)

    const { backgroundColor: color, index, label, ratio, legend } = this.props

    if (bar.type === "custom") {
      return bar.Custom(
        {},
        {
          color,
          index,
          ratio,
          theme,
          label,
          legend,
          data,
        }
      )
    }

    const { thickness } = bar

    //   const horizontal = xAxis.axis === "data"

    if (this.props.direction === "horizontal") {
      return Row({
        children: [
          Flexible({
            flex: this.props.ratio,
            child: Container({
              color,
              width: Infinity,
              height: thickness,
            }),
          }),
          Flexible({ flex: 1 - this.props.ratio || 0.0001 }),
        ],
      })
    } else {
      return Column({
        children: [
          Flexible({ flex: 1 - this.props.ratio || 0.0001 }),
          Flexible({
            flex: this.props.ratio,
            child: Container({
              color,
              width: thickness,
              height: Infinity,
            }),
          }),
        ],
      })
    }
  }
}

export default (props: BarProps) => new Bar(props)
