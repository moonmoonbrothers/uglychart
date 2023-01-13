import {
  Alignment,
  BorderStyle,
  EdgeInsets,
  Widget,
} from "@moonmoonbrothers/flutterjs"
import { TextProps, TextStyle } from "@moonmoonbrothers/flutterjs/src/component/base/BaseText"

export type BarChartProps = {
  title?: string
  data: Data
  theme?: Theme
  padding?: EdgeInsets
  custom?: Custom
}

export type Custom = {
  title?: Title
  bar?: Bar
  barLayout?: BarLayout
  xAxisScale?: XAxisScale
  yAxisScale?: YAxisScale
  xAxisLabel?: XAxisLabel
  yAxisLabel?: YAxisLabel
  plot?: Plot
  chart?: Chart
  dataLabel?: DataLabel
  additions?: Addition[]
}

export type Data = {
  labels: string[]
  datasets: {
    legend: string
    data: number[]
  }[]
}

type BarLayout =
  | {
      type: "stack"
      Custom?: () => Widget
    }
  | {
      type: "series"
      gap?: number
    }
  | {
      type: "custom"
      Custom: () => Widget
    }

type Bar =
  | {
      type: "config"
      thickness?: number
      thicknessPercentage?: number
      colors?: string[]
    }
  | {
      type: "custom"
      Custom: () => Widget
    }

type Title =
  | {
      type: "config"
      margin?: EdgeInsets
      alignment?: "start" | "end" | "center"
      font?: Font
    }
  | {
      type: "custom"
      Custom: (props: {text: string}) => Widget
    }

type Tick =
  | {
      type: "config"
      color?: string
      thickness?: number
      length?: number
    }
  | {
      type: "custom"
      Custom: () => Widget
    }

export type XAxisScale = DataAxisScale | LabelAxisScale

export type YAxisScale = DataAxisScale | LabelAxisScale

type YAxisLabel =
  | {
      type: "config"
      margin?: EdgeInsets
      font?: Font
    }
  | {
      type: "custom"
      Custom: () => Widget
    }

type XAxisLabel =
  | {
      type: "config"
      margin?: EdgeInsets
      font?: Font
    }
  | {
      type: "custom"
      Custom: () => Widget
    }

type DataLabel =
  | {
      type: "config"
      margin?: EdgeInsets
      font?: Font
    }
  | {
      type: "custom"
      Custom: () => Widget
    }

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
  | {
      type: "custom"
      Custom: () => Widget
    }

export type Chart = {
  type: "config"
  width?: number
  height?: number
  alignment?: Alignment
} | {
  type: "custom"
  Custom: () => Widget
}

export type Theme = {
  text?: Font
  borderColor?: string
}

export type Font = TextProps

export type Addition = {
  position: { top?: number; bottom?: number; left?: number; right?: number }
  Custom: () => Widget
}

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
} | {
  axis: "data"
  type: "custom"
  Custom: () => Widget
}

type LabelAxisScale = {
  axis: "label"
  type: "config"
  color?: string
  thickness?: number
  tick?: Tick
} | {
  axis: "label"
  type: "custom"
  Custom: () => Widget
}
