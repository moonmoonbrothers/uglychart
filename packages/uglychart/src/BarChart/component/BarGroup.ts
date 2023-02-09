import {
  Column,
  ComponentWidget,
  Container,
  EdgeInsets,
  Expanded,
  Flexible,
  Padding,
  Row,
  Widget,
} from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import {
  CustomProvider,
  DataProvider,
  ScaleProvider,
  ThemeProvider,
} from "../provider"
import Bar from "./Bar"

type BarGroupProps = {
  direction: "vertical" | "horizontal"
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
    const scale = ScaleProvider.of(context)
    const { index, label } = this.props

    if (barGroup.type === "custom") {
      return barGroup.Custom({ Bar }, { index, theme, label })
    }

    const { barBackgroundColors: backgroundColors = ["gray"] } = barGroup
    const { datasets, labels } = data

    const getRatio = (value: number) => {
      return (value - scale.min) / (scale.max - scale.min)
    }

    return Container({
      width: Infinity,
      child: (this.props.direction === "horizontal" ? Column : Row)({
        children: [
          Expanded(),
          ...datasets.map(({ data, legend }, index) =>
            Padding({
              padding: EdgeInsets.symmetric(
                this.props.direction === "vertical"
                  ? { horizontal: 2 }
                  : { vertical: 2 }
              ),
              child: Bar({
                direction: this.props.direction,
                backgroundColor:
                  backgroundColors[index % backgroundColors.length],
                index,
                label: labels[this.props.index],
                legend,
                ratio: getRatio(data[this.props.index]),
              }),
            })
          ),
          Expanded(),
        ],
      }),
    })
  }
}

export default (props: BarGroupProps) => new BarGroup(props)
