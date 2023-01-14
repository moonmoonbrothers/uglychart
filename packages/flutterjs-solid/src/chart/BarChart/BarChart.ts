import {
  Container,
  Text,
  Alignment,
  Column,
  type Widget,
  EdgeInsets,
  Grid,
  Row,
  Align,
  IntrinsicWidth,
  IntrinsicHeight,
  Flexible,
  Stack,
  Positioned,
  ComponentWidget,
} from "@moonmoonbrothers/flutterjs"
import { ThemeProvider, DataProvider, CustomProvider } from "./provider"
import { BarChartProps } from "./types"
import DefaultTitle from "./component/Title"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import Layout from "./component/Layout"

const BarChart = ({
  padding,
  custom: {
    layout = { type: "config" as const },
    title = { type: "config" as const },
    bar = { type: "config" as const },
    barGroup = { kind: "series" as const, type: "config" as const },
    xAxis = { type: "config" as const },
    yAxis = { type: "config" as const },
    xAxisScale = { axis: "data" as const, type: "config" as const },
    yAxisScale = { axis: "label" as const, type: "config" as const },
    xAxisLabel = { type: "config" as const },
    yAxisLabel = { type: "config" as const },
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
}: BarChartProps) => {
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
          xAxisScale,
          yAxisScale,
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

const Chart = () => {
  return Align({
    alignment: Alignment.center,
    child: Stack({
      children: [
        Container({
          child: IntrinsicHeight({
            child: IntrinsicWidth({
              child: Grid({
                childrenByRow: [],
                templateColumns: [Grid.ContentFit(), Grid.Fr(1)],
                templateRows: [Grid.Fr(1), Grid.ContentFit()],
              }),
            }),
          }),
        }),
      ],
    }),
  })
}

const XAxis = () =>
  Column({
    children: [
      Row({
        mainAxisAlignment: "spaceBetween",
        children: [Tick2(), Tick2(), Tick2(), Tick2(), Tick2()],
      }),
      Row({
        mainAxisAlignment: "spaceBetween",
        children: [XLabel({ text: "AA" })],
      }),
    ],
  })

const Tick2 = () =>
  Container({
    height: 10,
    width: 2,
    color: "black",
  })

const YAxis = () =>
  Row({
    children: [
      Column({
        mainAxisAlignment: "spaceBetween",
        children: [Text("asdf")],
      }),
      Column({
        mainAxisAlignment: "spaceBetween",
        children: [Tick(), Tick(), Tick()],
      }),
    ],
  })
const Plot = () =>
  Container({
    color: "red",
    width: 300,
    height: 200,
    alignment: Alignment.center,
    child: Text("plot", {
      style: { fontColor: "white", fontSize: "30px" },
    }),
  })

const XLabel = ({ text }: { text: string }) =>
  Container({
    width: 0,
    child: Text(text, { textAlign: "middle", style: { fontSize: "30px" } }),
  })

const Tick = () =>
  Container({
    width: 10,
    height: 2,
    color: "black",
  })

const labelAxisWrapper = () => {}

new Function()
