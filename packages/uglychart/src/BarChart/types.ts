import {
  Alignment,
  BorderStyle,
  EdgeInsets,
  Widget,
} from "@moonmoonbrothers/flutterjs"
import { TextProps } from "@moonmoonbrothers/flutterjs/src/component/base/BaseText"
import { BarProps } from "./component/Bar"
import { BarGroupProps } from "./component/BarGroup"
import { PlotProps } from "./component/Plot"
import { XAxisProps } from "./component/XAxis"
import { YAxisProps } from "./component/YAxis"
import { YAxisLabelProps } from "./component/YAxisLabel"
import { Scale as _Scale } from "./util/getScale"

export type Scale = _Scale

export type BarChartProps = {
  data: Data
  scale?: Partial<Scale>
  theme?: Theme
  padding?: EdgeInsets
  custom?: Custom
}

export type BarChartType = "vertical" | "horizontal"

export type Custom = {
  title?: Title
  bar?: Bar
  layout?: Layout
  barGroup?: BarGroup
  xAxis?: XAxis
  xAxisLabel?: XAxisLabel
  yAxis?: YAxis
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
      barBackgroundColors?: string[]
      barBorderColors?: string[]
    }
  | {
      kind: "stack"
      type: "config"
      barBackgroundColors?: string[]
      barBorderColors?: string[]
    }
  | CustomWidget<
      {
        Bar: (props: BarProps) => Widget
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
        ratio: number
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

export type XAxis =
  | Axis
  | {
      type: "config"
      color?: string
      thickness?: number
      tick?: Tick
    }
  | ({ axis: "data" | "label" } & CustomWidget<
      { XAxisLabel: (props: { index: number; text: number }) => Widget },
      { data: Data }
    >)

export type YAxis =
  | Axis
  | CustomWidget<
      { YAxisLabel: (props: YAxisLabelProps) => Widget },
      { data: Data }
    >

type Layout =
  | {
      type: "config"
      padding?: EdgeInsets
    }
  | CustomWidget<"Title" | "Chart">

type Tick = {
  type: "config"
  color?: string
  width?: number
  height?: number
}

type Axis = {
  type: "config"
  color?: string
  thickness?: number
  tick?: Tick
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
      {
        BarGroup: (props: BarGroupProps) => Widget
      },
      { data: Data }
    >

export type Chart =
  | {
      type: "config"
      width?: number
      height?: number
      scale?: Partial<Scale>
      direction?: "horizontal" | "vertical"
      alignment?: Alignment
    }
  | CustomWidget<{
      Plot: (props: PlotProps) => Widget
      XAxis: (props: XAxisProps) => Widget
      YAxis: (props: YAxisProps) => Widget
    }>

export type Theme = {
  text?: Font
  borderColor?: string
}

export type Font = TextProps

export type Addition = {
  position: { top?: number; bottom?: number; left?: number; right?: number }
  Custom: () => Widget
}
