import {
  Column,
  ComponentWidget,
  Expanded,
  Flexible,
  Row,
  Widget,
} from "@moonmoonbrothers/flutterjs"
import SizeBox from "@moonmoonbrothers/flutterjs/src/component/SizedBox"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import BarChart from "../BarChart"
import { BarChartProps, Scale } from "../BarChart/types"
import { getScale } from "../BarChart/util"
import { getStackValueEdge } from "./util/getStackValueEdge"

export type StackBarChartProps = BarChartProps & {
  custom?: {
    barGroup:
      | {
          type: "config"
          asdf?: string[]
        }
      | {
          type: "custom"
          Custom: () => Widget
        }
  }
}

export class StackedBarChart extends ComponentWidget {
  constructor(private props: StackBarChartProps) {
    super()
    if (props.custom?.barGroup.type === "config") {
    }
  }

  build(context: BuildContext): Widget {
    const {
      data: { datasets },
      scale: scaleOption,
    } = this.props

    /* 
      scale을 구하고 
    */
    const valueEdge = getStackValueEdge(datasets.map(({ data }) => data))

    const roughEdge = {
      min: valueEdge.min > 0 ? 0 : valueEdge.min,
      max: valueEdge.max < 0 ? 0 : valueEdge.max,
    }
    const roughStepCount = 10 /* chart size에 따라 보정 필요!*/

    const roughScale: Scale = {
      min: roughEdge.min,
      max: roughEdge.max,
      step: (roughEdge.max - roughEdge.min) / roughStepCount,
    }

    const suggestedScale = getScale(roughScale)

    const scale: Scale = {
      min: scaleOption?.min ?? suggestedScale.min,
      max: scaleOption?.max ?? suggestedScale.max,
      step: scaleOption?.step ?? suggestedScale.step,
    }

    return BarChart({
      ...this.props,
      custom: {
        ...this.props.custom,
        chart: this.props.custom?.chart ?? {
          type: "config",
          scale,
        },
        barGroup: {
          type: "custom",
          Custom({ Bar }, { data, theme, scale, direction, index, label }) {
            const backgroundColors = ["grey"]
            const { datasets } = data

            const barGroupRatio = {
              negative:
                scale.min > 0 ? 0 : (0 - scale.min) / (scale.max - scale.min),
              positive:
                scale.max < 0 ? 0 : (scale.max - 0) / (scale.max - scale.min),
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
                child: (direction === "horizontal" ? Row : Column)({
                  children,
                }),
              })
            }

            const areas: AreaType[] =
              direction === "horizontal"
                ? ["negative", "positive"]
                : ["positive", "negative"]

            const barRatio = {
              negative: (value: number) => {
                // this must not be happened!
                if (value > 0 || scale.min > 0) return 0

                const max = -1 * scale.min
                const min = Math.min(-1 * scale.max, 0)

                return (-1 * value - min) / (max - min)
              },
              positive: (value: number) => {
                // this must not be happened!
                if (value < 0 || scale.max < 0) return 0

                const max = scale.max
                const min = Math.min(scale.min, 0)

                return (value - min) / (max - min)
              },
            }

            const barData = {
              negative: datasets.map(({ data, legend }) => ({
                legend,
                value: data[index] > 0 ? 0 : data[index],
              })),
              positive: datasets.map(({ data, legend }) => ({
                legend,
                value: data[index] > 0 ? 0 : data[index],
              })),
            }

            const StackedBar = ({
              index,
              legend,
            }: {
              index: number
              legend: string
            }) =>
              Bar({
                direction,
                backgroundColor:
                  backgroundColors[index % backgroundColors.length],
                index,
                label,
                legend,
                ratio: 1,
              })

            const StackedBars = ({ type }: { type: AreaType }) => {
              const total = barData[type]
                .map(({ value }) => value)
                .reduce((acc, value) => acc + value, 0)
              const spaceRatio = 1 - barRatio[type](total)

              const bars = [
                ...barData[type].map(({ value, legend }, index) =>
                  Flexible({
                    flex: barRatio[type](value),
                    child: StackedBar({
                      index,
                      legend,
                    }),
                  })
                ),
                spaceRatio
                  ? Expanded({ flex: spaceRatio })
                  : SizeBox({ width: 0, height: 0 }),
              ]
              return type === "positive" ? bars : bars.reverse()
            }

            return BarGroupContainer({
              children: areas.map((type) =>
                BarGroup({
                  type,
                  children: [
                    type === "negative"
                      ? Expanded({
                          flex: barRatio[type](
                            barData[type]
                              .map(({}) => 1)
                              .reduce((a, b) => a + b, 0)
                          ),
                        })
                      : SizeBox({ width: 0, height: 0 }),
                    ...StackedBars({ type }),
                    type === "positive"
                      ? Expanded({})
                      : SizeBox({ width: 0, height: 0 }),
                  ],
                })
              ),
            })
          },
        },
      },
    })
  }
}

export default StackedBarChart
