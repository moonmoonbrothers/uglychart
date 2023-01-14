import {
  Alignment,
  BorderStyle,
  ComponentWidget,
  EdgeInsets,
  Widget,
} from "@moonmoonbrothers/flutterjs"
import {
  TextProps,
  TextStyle,
} from "@moonmoonbrothers/flutterjs/src/component/base/BaseText"

export type BarChartProps = {
  data: Data
  theme?: Theme
  padding?: EdgeInsets
  custom?: Custom
}

export type Custom = {
  title?: Title
  bar?: Bar
  layout?: Layout
  barGroup?: BarGroup
  xAxis?: XAxis
  xAxisScale?: XAxisScale
  xAxisLabel?: XAxisLabel
  yAxis?: YAxis
  yAxisScale?: YAxisScale
  yAxisLabel?: YAxisLabel
  plot?: Plot
  chart?: Chart
  dataLabel?: DataLabel
  additions?: Addition[]
}

export type Data = {
  title?: string
  labels: string[]
  datasets: {
    legend: string
    data: number[]
  }[]
}

type CustomWidget<T extends string | {} | Record<string, any>, R = {}> = {
  type: "custom"
  Custom: (
    child: T extends string
      ? { [key in T]: () => Widget }
      : T extends {}
      ? {}
      : T,
    data: R & { theme: Theme }
  ) => Widget
}

type XAxis =
  | {
      type: "config"
    }
  | CustomWidget<{
      XAxisLabel: (props: { index: number; text: number }) => Widget
      XAxisScale: () => Widget
    }>

type YAxis =
  | {
      type: "config"
    }
  | CustomWidget<{
      YAxisLabel: (props: { index: number; text: number }) => Widget
      YAxisScale: () => Widget
    }>

type BarGroup =
  | {
      kind: "series"
      type: "config"
    }
  | {
      kind: "stack"
      type: "config"
      gap?: number
    }
  | CustomWidget<
      {
        Bar: (props: {
          color: string
          index: number
          minValue: number
          maxValue: number
          value: number
          label: string
          legend: string
        }) => Widget
      },
      { index: number; label: string }
    >

type Bar =
  | {
      type: "config"
      thickness?: number
      thicknessPercentage?: number
      colors?: string[]
    }
  | CustomWidget<
      {},
      {
        color: string
        index: number
        minValue: number
        maxValue: number
        value: number
        label: string
        legend: string
        data: Data
        theme: Theme
      }
    >

type Title =
  | {
      type: "config"
      margin?: EdgeInsets
      alignment?: "start" | "end" | "center"
      font?: Font
    }
  | CustomWidget<{}, { text: string }>

type XAxisLabel =
  | {
      type: "config"
      margin?: EdgeInsets
      font?: Font
    }
  | CustomWidget<{}, { text: string; index: number }>

type YAxisLabel =
  | {
      type: "config"
      margin?: EdgeInsets
      font?: Font
    }
  | CustomWidget<{}, { text: string; index: number }>

export type XAxisScale =
  | DataAxisScale
  | LabelAxisScale
  | ({ axis: "data" | "label" } & CustomWidget<{}, { data: Data }>)

export type YAxisScale =
  | DataAxisScale
  | LabelAxisScale
  | ({ axis: "data" | "label" } & CustomWidget<{}, { data: Data }>)

type Layout =
  | {
      type: "config"
      padding?: EdgeInsets
    }
  | CustomWidget<"Title" | "Chart">

type DataAxisScale = {
  axis: "data"
  type: "config"
  value?: {
    step?: number
    min?: number
    max?: number
  }
  color?: string
  thickness?: number
  tick?: Tick
}

type LabelAxisScale = {
  axis: "label"
  type: "config"
  color?: string
  thickness?: number
  tick?: Tick
}

type Tick = {
  type: "config"
  color?: string
  width?: number
  height?: number
}

type DataLabel =
  | {
      type: "config"
      margin?: EdgeInsets
      font?: Font
    }
  | CustomWidget<
      {},
      { value: string; index: number; legend: string; label: string }
    >

type Plot =
  | {
      type: "config"
      width?: number
      height?: number
      border?: BorderStyle
      verticalLine?: {
        color?: string
        width?: string
        count?: number
      }
      horizontalLine?: {
        color?: string
        width?: string
        count?: number
      }
    }
  | CustomWidget<
      { BarGroup: (props: { index: number; label: string }) => Widget },
      { data: Data }
    >

export type Chart =
  | {
      type: "config"
      width?: number
      height?: number
      alignment?: Alignment
    }
  | CustomWidget<"XAxis" | "YAxis" | "Plot">

export type Theme = {
  text?: Font
  borderColor?: string
}

export type Font = TextProps

export type Addition = {
  position: { top?: number; bottom?: number; left?: number; right?: number }
  Custom: () => Widget
}
