import { Alignment, EdgeInsets, Widget, type Positioned } from "@moonmoonbrothers/flutterjs"

export type BarChartProps = {
  title?: string
  data: Data
  theme?: Theme
  width?: string
  height?: string
  padding?: EdgeInsets
  custom?: {
    title: Title
    bar?: Bar
    barLayout?: BarLayout
    xAxis?: XAxis
    yAxis?: YAxis
    xAxisLabel?: XAxisLabel
    yAxisLabel?: YAxisLabel
    plot?: Plot
    chart?: Chart
    dataLabel?: DataLabel
    additions?: Addition[]
  }
}

export type Data = {
  labels: string[]
  datasets: {
    legend: string
    data: number[]
  }[]
}

type BarLayout = {
  stacked?: boolean
  gap?: number
}

type Bar = {
  thickness?: number
  thicknessPercentage?: number
  colors?: string[]
  custom?: () => Widget
}

type Title = {
  margin?: EdgeInsets
  alignment?: Alignment
  font?: Font
  custom?: () => Widget
}

type YAxis = {
  color?: string
  thickness?: number
}

type Tick = {}

type XAxis = {
  color?: string
  thickness?: number
  tick?: Tick
}

type YAxisLabel = {
  margin?: EdgeInsets
  font?: Font
}

type XAxisLabel = {
  margin?: EdgeInsets
  font?: Font
}

type DataLabel = {
  margin?: EdgeInsets
  font?: Font
}

type Plot = {
  minValue?: number
  maxValue?: number
  width?: number
  height?: number
}

type Chart = {}

type Theme = {
  font?: Font
  borderColor?: string
}

type Font = {
  color?: string
  weight?: number
  lineHeight?: number
  family?: string
  size?: string
}

type Addition = {
  positioned: ReturnType<typeof Positioned>
}
