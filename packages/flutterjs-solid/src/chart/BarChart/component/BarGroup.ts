import {
  Column,
  ComponentWidget,
  Container,
  Row,
  Widget,
} from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { CustomProvider, DataProvider, ThemeProvider } from "../provider"
import Bar from "./Bar"

type BarGroupProps = {
  index: number
  label: string
}

class BarGroup extends ComponentWidget {
  constructor(private props: BarGroupProps) {
    super()
  }
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context)
    const { barGroup } = CustomProvider.of(context)
    const data = DataProvider.of(context)
    const { index, label } = this.props

    if (barGroup.type === "custom") {
      return barGroup.Custom({ Bar }, { index, theme, label })
    }

    const { datasets, labels } = data

    return Container({
      width: Infinity,
      child: Column({
        mainAxisAlignment: "spaceAround",
        children: datasets.map(({ data, legend }, index) =>
          Bar({
            color: "black",
            index,
            label: labels[this.props.index],
            legend,
            maxValue: 100,
            minValue: 0,
            value: data[this.props.index],
          })
        ),
      }),
    })
  }
}

export default (props: BarGroupProps) => new BarGroup(props)
