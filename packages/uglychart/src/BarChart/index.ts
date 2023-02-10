import { ThemeProvider, DataProvider, CustomProvider } from "./provider"
import { BarChartProps, BarChartType, XAxis, YAxis } from "./types"
import Layout from "./component/Layout"
import { ComponentWidget, Widget } from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { Custom, Data, Theme } from "./types"

class BarChart extends ComponentWidget {
  custom: Required<Custom>
  data: Data
  theme: Required<Theme>

  constructor({
    custom: {
      layout = { type: "config" as const },
      title = { type: "config" as const },
      bar = { type: "config" as const },
      barGroup = {
        type: "config" as const,
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
    return ThemeProvider({
      theme: this.theme,
      child: DataProvider({
        data: this.data,
        child: CustomProvider({
          custom: this.custom,
          child: Layout(),
        }),
      }),
    })
  }
}

export default (props: BarChartProps) => new BarChart(props)
