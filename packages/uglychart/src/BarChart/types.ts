import {
  Alignment,
  BorderStyle,
  EdgeInsets,
  Radius,
  Widget,
} from "@moonmoonbrothers/flutterjs";
import { BarProps } from "./component/Bar";
import { BarGroupProps } from "./component/BarGroup";
import { PlotProps } from "./component/Plot";
import { XAxisProps } from "./component/XAxis";
import { YAxisProps } from "./component/YAxis";
import { YAxisLabelProps } from "./component/YAxisLabel";
import { Scale as _Scale } from "./util/getScale";

export type Scale = _Scale;

export type BarChartProps = {
  data: Data;
  scale?: Partial<Scale>;
  theme?: Theme;
  padding?: EdgeInsets;
  custom?: Custom;
};

export type BarChartType = "vertical" | "horizontal";

export type Custom = {
  title?: Title;
  bar?: Bar;
  layout?: Layout;
  barGroup?: BarGroup;
  xAxis?: XAxis;
  xAxisLabel?: XAxisLabel;
  yAxis?: YAxis;
  yAxisLabel?: YAxisLabel;
  plot?: Plot;
  chart?: Chart;
  dataLabel?: DataLabel;
  additions?: Addition[];
};

export type Data = {
  title?: string;
  labels: string[];
  datasets: {
    legend: string;
    data: number[];
  }[];
};

export type CustomWidget<
  T extends string | {} | Record<string, any>,
  R = {}
> = {
  type: "custom";
  Custom: (
    child: T extends string
      ? { [key in T]: () => Widget }
      : T extends {}
      ? T
      : {},
    data: R & { theme: Theme; data: Data }
  ) => Widget;
};

type BarGroup =
  | {
      type: "config";
      barBackgroundColors?: string[];
      barBorderColors?: string[];
      gap?: number;
    }
  | CustomWidget<
      {
        Bar: (props: BarProps) => Widget;
      },
      BarGroupProps
    >;

type Bar =
  | {
      type: "config";
      thickness?: number;
      thicknessPercentage?: number;
      colors?: string[];
    }
  | CustomWidget<
      {},
      {
        backgroundColor: string;
        index: number;
        ratio: number;
        label: string;
        legend: string;
        reverse: boolean;
        direction: "vertical" | "horizontal";
        data: Data;
        theme: Theme;
      }
    >;

type Title =
  | {
      type: "config";
      margin?: EdgeInsets;
      alignment?: "start" | "end" | "center";
      font?: Font;
    }
  | CustomWidget<{}, { text: string }>;

type XAxisLabel =
  | {
      type: "config";
      margin?: EdgeInsets;
      font?: Font;
    }
  | CustomWidget<{}, { text: string; index: number }>;

type YAxisLabel =
  | {
      type: "config";
      margin?: EdgeInsets;
      font?: Font;
    }
  | CustomWidget<{}, { text: string; index: number }>;

export type XAxis =
  | Axis
  | {
      type: "config";
      color?: string;
      thickness?: number;
      tick?: Tick;
    }
  | ({ axis: "data" | "label" } & CustomWidget<
      { XAxisLabel: (props: { index: number; text: string }) => Widget },
      { data: Data }
    >);

export type YAxis =
  | Axis
  | CustomWidget<
      { YAxisLabel: (props: YAxisLabelProps) => Widget },
      { data: Data }
    >;

type Layout =
  | {
      type: "config";
      padding?: EdgeInsets;
    }
  | CustomWidget<"Title" | "Chart">;

type Tick = {
  type: "config";
  color?: string;
  width?: number;
  height?: number;
};

type Axis = {
  type: "config";
  color?: string;
  thickness?: number;
  tick?: Tick;
};

type DataLabel =
  | {
      type: "config";
      gap?: number;
      font?: Font;
      backgroundColor?: string;
      borderColor?: string;
      borderWidth?: number;
      borderRadius?: Radius;
    }
  | CustomWidget<
      {},
      {
        value: number;
        index: number;
        legend: string;
        label: string;
        reverse: boolean;
        direction: "horizontal" | "vertical";
      }
    >;

type Plot =
  | {
      type: "config";
      width?: number;
      height?: number;
      border?: BorderStyle;
      verticalLine?: {
        color?: string;
        width?: string;
        count?: number;
      };
      horizontalLine?: {
        color?: string;
        width?: string;
        count?: number;
      };
    }
  | CustomWidget<
      {
        BarGroup: (props: BarGroupProps) => Widget;
      },
      { data: Data }
    >;

export type Chart =
  | {
      type: "config";
      width?: number;
      height?: number;
      scale?: Partial<Scale>;
      direction?: "horizontal" | "vertical";
      alignment?: Alignment;
    }
  | CustomWidget<{
      Plot: (props: PlotProps) => Widget;
      XAxis: (props: XAxisProps) => Widget;
      YAxis: (props: YAxisProps) => Widget;
    }>;

export type Theme = {
  text?: Font;
  borderColor?: string;
};

export type Font = {
  fontSize?: number;
  color?: string;
  fontFamily?: string;
};

export type Addition = {
  position: { top?: number; bottom?: number; left?: number; right?: number };
  Custom: () => Widget;
};
