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
import SizeBox from "@moonmoonbrothers/flutterjs/src/component/SizedBox"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { Utils } from "../../utils"
import { CustomProvider, DataProvider, ThemeProvider } from "../provider"
import { Scale } from "../util"
import Bar from "./Bar"

export type BarGroupProps = {
  direction: "vertical" | "horizontal"
  index: number
  label: string
  scale: Scale
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

    const { barBackgroundColors: backgroundColors = ["gray"] } = barGroup
    const { datasets, labels } = data

    const { scale } = this.props
    const getRatio = (value: number) => {
      return (value - scale.min) / (scale.max - scale.min)
    }
    const barGroupRatio = {
      negative: scale.min > 0 ? 0 : (0 - scale.min) / (scale.max - scale.min),
      positive: scale.max < 0 ? 0 : (scale.max - 0) / (scale.max - scale.min),
    }

    const barRatio = {
      negative: (value: number) => {
        if (value > 0 || scale.min > 0) return 0

        const max = -1 * scale.min
        const min = Math.min(-1 * scale.max, 0)

        return (-1 * value - min) / (max - min)
      },
      positive: (value: number) => {
        if (value < 0 || scale.max < 0) return 0

        const max = scale.max
        const min = Math.min(scale.min, 0)

        return (value - min) / (max - min)
      },
    }

    if (this.props.direction === "horizontal") {
      return Row({
        children: [
          barGroupRatio.negative
            ? Flexible({
                flex: barGroupRatio.negative,
                child: Column({
                  // mainAxisAlignment: center 가 아직 없어서 임시로 Expanded 붙여놓음 ㅎㅎ;;
                  children: [
                    Expanded(),
                    ...datasets.map(({ data, legend }, index) =>
                      this.Bar({
                        legend: legend,
                        index,
                        reverse: true,
                        ratio: barRatio.negative(data[this.props.index]),
                        backgroundColor:
                          backgroundColors[index % backgroundColors.length],
                      })
                    ),
                    Expanded(),
                  ],
                }),
              })
            : SizeBox({ width: 0, height: 0 }),
          barGroupRatio.positive
            ? Flexible({
                flex: barGroupRatio.positive,
                child: Column({
                  // mainAxisAlignment: center 가 아직 없어서 임시로 Expanded 붙여놓음 ㅎㅎ;;
                  children: [
                    Expanded(),
                    ...datasets.map(({ data, legend }, index) =>
                      this.Bar({
                        legend: legend,
                        index,
                        reverse: false,
                        ratio: barRatio.positive(data[this.props.index]),
                        backgroundColor:
                          backgroundColors[index % backgroundColors.length],
                      })
                    ),
                    Expanded(),
                  ],
                }),
              })
            : SizeBox({ width: 0, height: 0 }),
        ],
      })
    } else {
      return Column({
        children: [
          barGroupRatio.positive
            ? Flexible({
                flex: barGroupRatio.positive,
                child: Row({
                  // mainAxisAlignment: center 가 아직 없어서 임시로 Expanded 붙여놓음 ㅎㅎ;;
                  children: [
                    Expanded(),
                    ...datasets.map(({ data, legend }, index) =>
                      this.Bar({
                        legend: legend,
                        index,
                        reverse: false,
                        ratio: barRatio.positive(data[this.props.index]),
                        backgroundColor:
                          backgroundColors[index % backgroundColors.length],
                      })
                    ),
                    Expanded(),
                  ],
                }),
              })
            : SizeBox({ width: 0, height: 0 }),
          barGroupRatio.negative
            ? Flexible({
                flex: barGroupRatio.negative,
                child: Row({
                  // mainAxisAlignment: center 가 아직 없어서 임시로 Expanded 붙여놓음 ㅎㅎ;;
                  children: [
                    Expanded(),
                    ...datasets.map(({ data, legend }, index) =>
                      this.Bar({
                        legend: legend,
                        index,
                        reverse: true,
                        ratio: barRatio.negative(data[this.props.index]),
                        backgroundColor:
                          backgroundColors[index % backgroundColors.length],
                      })
                    ),
                    Expanded(),
                  ],
                }),
              })
            : SizeBox({ width: 0, height: 0 }),
        ],
      })
    }
  }

  Bar({
    legend,
    index,
    ratio,
    backgroundColor,
    reverse,
  }: {
    ratio: number
    legend: string
    index: number
    backgroundColor: string
    reverse: boolean
  }) {
    return Padding({
      padding: EdgeInsets.symmetric(
        this.props.direction === "horizontal"
          ? { vertical: 2 }
          : { horizontal: 2 }
      ),
      child: Bar({
        direction: this.props.direction,
        backgroundColor: backgroundColor,
        index,
        label: this.props.label,
        legend,
        reverse,
        ratio: ratio,
      }),
    })
  }
}

export default (props: BarGroupProps) => new BarGroup(props)
