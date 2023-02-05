import {
  Alignment,
  BorderStyle,
  EdgeInsets,
  Widget,
} from "@moonmoonbrothers/flutterjs"
import { TextProps } from "@moonmoonbrothers/flutterjs/src/component/base/BaseText"

export type BarChartProps<TYPE extends BarChartType> = {
  data: Data
  theme?: Theme
  padding?: EdgeInsets
  custom?: Custom<TYPE>
  type: TYPE
}

export type BarChartType = "vertical" | "horizontal"

export type Custom<TYPE extends BarChartType> = {
  title?: Title
  bar?: Bar
  layout?: Layout
  barGroup?: BarGroup
  xAxis?: XAxis<TYPE>
  xAxisLabel?: XAxisLabel
  yAxis?: YAxis<TYPE>
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

export type XAxis<TYPE extends BarChartType> =
  | (TYPE extends "horizontal" ? DataAxis : LabelAxis)
  | ({ axis: "data" | "label" } & CustomWidget<
      { XAxisLabel: (props: { index: number; text: number }) => Widget },
      { data: Data }
    >)

export type YAxis<TYPE extends BarChartType> =
  | (TYPE extends "vertical" ? DataAxis : LabelAxis)
  | CustomWidget<
      { YAxisLabel: (props: { index: number; text: number }) => Widget },
      { data: Data }
    >

type Layout =
  | {
      type: "config"
      padding?: EdgeInsets
    }
  | CustomWidget<"Title" | "Chart">

type DataAxis = {
  type: "config"
  axis: 'data',
  scale?: {
    step?: number
    min?: number
    max?: number
  }
  color?: string
  thickness?: number
  tick?: Tick
}

type LabelAxis = {
  type: "config"
  axis: 'label',
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
