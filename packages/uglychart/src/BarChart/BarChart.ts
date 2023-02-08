import {
  ThemeProvider,
  DataProvider,
  CustomProvider,
  ScaleProvider,
} from "./provider"
import { BarChartProps, BarChartType, XAxis, YAxis } from "./types"
import Layout from "./component/Layout"
import getScale, { Scale } from "./util/getScale"
import { ComponentWidget, Widget } from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { Custom, Data, Theme } from "./types"
import { getValueEdge } from "./util/getValueEdge"

class BarChart extends ComponentWidget {
  scale: { min?: number; max?: number; step?: number }
  custom: Required<Custom>
  data: Data
  theme: Required<Theme>

  constructor({
    scale = {},
    custom: {
      layout = { type: "config" as const },
      title = { type: "config" as const },
      bar = { type: "config" as const },
      barGroup = {
        type: "config" as const,
        kind: "series" as const,
      },
      xAxis = { type: "config" as const },
      yAxis = { type: "config" as const },
      xAxisLabel = {
        type: "config" as const,
        font: {},
      },
      yAxisLabel = {
        type: "config" as const,
      },
      plot = { type: "config" as const },
      chart = { type: "config" as const },
      dataLabel = { type: "config" as const },
      additions = [],
    } = {},
    data,
    theme: {
      text: {
        style: {
          fontColor = "black",
          fontFamily = "sans",
          fontSize = "16px",
          fontWeight = "500",
          lineHeight = "2px",
        } = {},
      } = {},
      borderColor = "lightblue",
    } = {},
  }: BarChartProps) {
    super()
    this.scale = scale

    this.custom = {
      layout,
      bar,
      barGroup,
      xAxis,
      yAxis,
      xAxisLabel,
      yAxisLabel,
      plot,
      chart,
      dataLabel,
      additions,
      title,
    }

    this.data = data

    this.theme = {
      borderColor,
      text: {
        style: {
          fontFamily,
          fontSize,
          fontWeight,
          lineHeight,
          fontColor,
        },
      },
    }
  }

  override build(context: BuildContext): Widget {
    /* 일단 여기서 구현 */
    /* scale도 커스텀 할 수 있어야 한다!*/
    /* 옵션을 받아야 하나? */
    /* 옵션은 axis안에 아니면 scale로 바깥에?,  */
    const valueEdge = getValueEdge(this.data.datasets.map(({ data }) => data))

    /* min value is 0 */
    const roughEdge = {
      min: this.scale.min ?? (valueEdge.min > 0 ? 0 : valueEdge.min),
      max: this.scale.max ?? valueEdge.max,
    }
    const roughStepCount = 10 /* chart size에 따라 보정 필요!*/

    const roughScale: Scale = {
      min: roughEdge.min,
      max: roughEdge.max,
      step: this.scale.step ?? (roughEdge.max - roughEdge.min) / roughStepCount,
    }

    const scale = getScale(roughScale)

    return ThemeProvider({
      theme: this.theme,
      child: DataProvider({
        data: this.data,
        child: CustomProvider({
          custom: this.custom,
          child: ScaleProvider({
            scale,
            child: Layout(),
          }),
        }),
      }),
    })
  }
}

export default <TYPE extends BarChartType>(props: BarChartProps) =>
  new BarChart(props)
