import { ThemeProvider, DataProvider, CustomProvider } from "./provider"
import { BarChartProps, BarChartType, XAxis, YAxis } from "./types"
import Layout from "./component/Layout"

const BarChart = <TYPE extends BarChartType>({
  custom: {
    layout = { type: "config" as const },
    title = { type: "config" as const },
    bar = { type: "config" as const },
    barGroup = { kind: "series" as const, type: "config" as const },
    xAxis = { type: "config" as const } as XAxis<TYPE>,
    yAxis = { type: "config" as const } as YAxis<TYPE>,
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
}: BarChartProps<TYPE>) => {
  return ThemeProvider({
    theme: {
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
    },
    child: DataProvider({
      data,
      child: CustomProvider({
        custom: {
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
        },
        child: Layout(),
      }),
    }),
  })
}
export default BarChart
