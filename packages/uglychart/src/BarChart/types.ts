import {
  Alignment,
  EdgeInsets,
  Radius,
  Widget,
} from "@moonmoonbrothers/flutterjs";
import { TitleConfig } from "./component/Title";
import { BarProps, BarConfig } from "./component/Bar";
import { BarGroupProps, BarGroupConfig } from "./component/BarGroup";
import { PlotProps, PlotConfig } from "./component/Plot";
import { XAxisProps } from "./component/XAxis";
import { YAxisProps } from "./component/YAxis";
import { YAxisLabelProps } from "./component/YAxisLabel";
import { LayoutConfig } from "./component/Layout";
import { Scale as _Scale } from "./util/getScale";
import { ChartConfig } from "./component/Chart";

export type Scale = _Scale;

export type BarChartProps = {
  data: Data;
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
  | BarGroupConfig
  | CustomWidget<
      {
        Bar: (props: BarProps) => Widget;
      },
      BarGroupProps
    >;

type Bar =
  | BarConfig
  | CustomWidget<
      {},
      {
        backgroundColor: string;
        index: number;
        label: string;
        legend: string;
        reverse: boolean;
        direction: "vertical" | "horizontal";
        data: Data;
        theme: Theme;
      }
    >;

type Title = TitleConfig | CustomWidget<{}, { text: string }>;

type AxisLabel = {
  type: "config";
  margin?: EdgeInsets;
  font?: Font;
};

type XAxisLabel = AxisLabel | CustomWidget<{}, { text: string; index: number }>;

type YAxisLabel = AxisLabel | CustomWidget<{}, { text: string; index: number }>;

export type XAxis =
  | Axis
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

type Layout = LayoutConfig | CustomWidget<"Title" | "Chart">;

type Tick = {
  color?: string;
  thickness?: number;
  length?: number;
};

type Axis = {
  type: "config";
  tick?: Tick;
  thickness?: number;
  color?: string;
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
  | PlotConfig
  | CustomWidget<
      {
        BarGroup: (props: BarGroupProps) => Widget;
      },
      { data: Data }
    >;

export type Chart =
  | ChartConfig
  | CustomWidget<{
      Plot: (props: PlotProps) => Widget;
      XAxis: (props: XAxisProps) => Widget;
      YAxis: (props: YAxisProps) => Widget;
    }>;

export type Theme = {
  text?: Font;
  border?: {
    color?: string;
    width?: number;
  };
};

export type Font = {
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  lineHeight?: number;
};
