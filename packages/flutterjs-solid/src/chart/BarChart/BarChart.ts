import {
  AppRunner,
  Container,
  Text,
  Alignment,
  Column,
  Expanded,
  type Widget,
  EdgeInsets,
  Grid,
  Row,
  Padding,
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
import BarLayout from "./component/BarLayout"

const BarChart = ({
  title: titleText,
  padding,
  custom: {
    title = { type: "config" as const },
    bar = { type: "config" as const },
    barLayout = { type: "series" as const },
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
          bar,
          barLayout,
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
        child: new Layout({
          title: titleText,
          padding,
        }),
      }),
    }),
  })
}
export default BarChart

class Layout extends ComponentWidget {
  private title: string
  private padding: EdgeInsets
  constructor({
    title = "",
    padding = EdgeInsets.all(0),
  }: {
    title?: string
    padding?: EdgeInsets
  }) {
    super()
    this.title = title
    this.padding = padding
  }
  build(context: BuildContext): Widget {
    const { title, chart } = CustomProvider.of(context)
    const Title =
      title.type === "custom"
        ? title.Custom({ text: this.title })
        : new DefaultTitle({
            text: this.title,
            align: title.alignment,
            margin: title.margin,
            textProps: title.font ?? ThemeProvider.of(context).text,
          })
    return Container({
      width: Infinity,
      height: Infinity,
      padding: this.padding,
      child: Column({
        children: [
          Title,
          Flexible({
            child: Chart(),
          }),
        ],
      }),
    })
  }
}

const Chart = () => {
  return Align({
    alignment: Alignment.center,
    child: Stack({
      children: [
        Container({
          child: IntrinsicHeight({
            child: IntrinsicWidth({
              child: Grid({
                childrenByRow: [
                  [YAxis(), Plot()],
                  [null, XAxis()],
                ],
                templateColumns: [Grid.ContentFit(), Grid.Fr(1)],
                templateRows: [Grid.Fr(1), Grid.ContentFit()],
              }),
            }),
          }),
        }),
        Positioned({
          right: 0,
          bottom: -30,
          child: Text("asdlkf"),
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
