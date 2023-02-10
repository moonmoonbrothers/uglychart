import {
  Column,
  ComponentWidget,
  Container,
  EdgeInsets,
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
import { Utils } from "../../utils"
import SizeBox from "@moonmoonbrothers/flutterjs/src/component/SizedBox"

export type BarProps = {
  backgroundColor: string
  index: number
  ratio: number
  reverse?: boolean
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
      const children = [
        this.props.ratio
          ? Flexible({
              flex: this.props.ratio,
              child: Container({
                color,
                height: thickness,
              }),
            })
          : Container({ height: thickness, width: Infinity }),
        1 - this.props.ratio
          ? Flexible({ flex: 1 - this.props.ratio })
          : SizeBox({ width: 0, height: 0 }),
      ]
      return Row({
        children: this.props.reverse ? children.reverse() : children,
      })
    } else {
      const children = [
        1 - this.props.ratio
          ? Flexible({ flex: 1 - this.props.ratio })
          : SizeBox({ width: 0, height: 0 }),
        this.props.ratio
          ? Flexible({
              flex: this.props.ratio,
              child: Container({
                color,
                width: thickness,
              }),
            })
          : Container({ width: thickness, height: Infinity }),
      ]
      return Column({
        children: this.props.reverse ? children.reverse() : children,
      })
    }
  }
}

export default (props: BarProps) => new Bar(props)
