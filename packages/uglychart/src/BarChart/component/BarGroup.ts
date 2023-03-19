import {
  Column,
  ComponentWidget,
  EdgeInsets,
  Expanded,
  Flexible,
  Padding,
  Row,
  Stack,
  Widget,
} from "@moonmoonbrothers/flutterjs"
import SizeBox from "@moonmoonbrothers/flutterjs/src/component/SizedBox"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
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
    const { scale, direction, label } = this.props
    const data = DataProvider.of(context)

    if (barGroup.type === "custom") {
      return barGroup.Custom({ Bar }, { theme, data, ...this.props })
    }

    const { barBackgroundColors: backgroundColors = ["gray"], gap = 2 } =
      barGroup
    const { datasets } = data

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

    type AreaType = "negative" | "positive"

    const BarGroupContainer = direction === "horizontal" ? Row : Column
    const BarGroup = ({
      type,
      children,
    }: {
      type: AreaType
      children: Widget[]
    }) => {
      const flex = barGroupRatio[type]
      if (flex === 0) return SizeBox({ width: 0, height: 0 })

      return Flexible({
        flex,
        child: (direction === "horizontal" ? Column : Row)({
          children,
        }),
      })
    }

    const barGap = EdgeInsets.symmetric(
      direction === "horizontal"
        ? { vertical: gap / 2 }
        : { horizontal: gap / 2 }
    )

    const areas: AreaType[] =
      direction === "horizontal"
        ? ["negative", "positive"]
        : ["positive", "negative"]

    return BarGroupContainer({
      children: areas.map((type) =>
        BarGroup({
          type,
          children: [
            /**
             * mainAxisAlignment: center가 없어서 임시로 Expanded로 구현;
             */
            Expanded(),
            ...datasets.map(({ data, legend }, index) => {
              const value = data[this.props.index]
              const reverse = type === "negative"
              return Padding({
                padding: barGap,
                child: Stack({
                  children: [
                    Bar({
                      direction,
                      backgroundColor:
                        backgroundColors[index % backgroundColors.length],
                      index,
                      label,
                      legend,
                      value,
                      reverse,
                      ratio: barRatio[type](value),
                    }),
                  ],
                }),
              })
            }),
            Expanded(),
          ],
        })
      ),
    })
  }
}

export default (props: BarGroupProps) => new BarGroup(props)
