import {
  EdgeInsets,
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
import { DataLabelConfig } from "./component/DataLabel";
import type { DeepPartial } from "../utils";
import { XAxisTickProps } from "./component/XAxisTick";
import { YAxisTickProps } from "./component/YAxisTick";

export type Scale = _Scale;

export type BarChartProps = {
  data: Data;
  theme?: DeepPartial<Theme>;
  padding?: EdgeInsets;
  custom?: Custom;
};

type CustomConfig<T> = { type: "config" } & T;

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
  xAxisTick?: XAxisTick;
  yAxisTick?: YAxisTick;
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
  | CustomConfig<BarGroupConfig>
  | CustomWidget<
      {
        Bar: (props: BarProps) => Widget;
      },
      BarGroupProps
    >;

type Bar =
  | CustomConfig<BarConfig>
  | CustomWidget<
      {},
      {
        backgroundColor: string;
        index: number;
        label: string;
        legend: string;
        direction: "vertical" | "horizontal";
        data: Data;
        theme: Theme;
      }
    >;

type Title = CustomConfig<TitleConfig> | CustomWidget<{}, { text: string }>;

type AxisLabel = {
  margin?: EdgeInsets;
  font?: Font;
};

type XAxisLabel =
  | CustomConfig<AxisLabel>
  | CustomWidget<{}, { text: string; index: number }>;

type YAxisLabel =
  | CustomConfig<AxisLabel>
  | CustomWidget<{}, { text: string; index: number }>;

export type XAxis =
  | CustomConfig<Axis>
  | ({ thickness: number; color: string } & CustomWidget<
      {
        XAxisTick: (props: XAxisTickProps) => Widget;
        XAxisLabel: (props: { index: number; text: string }) => Widget;
      },
      { data: Data }
    >);

export type YAxis =
  | CustomConfig<Axis>
  | ({ thickness: number; color: string } & CustomWidget<
      {
        YAxisTick: (props: YAxisTickProps) => Widget;
        YAxisLabel: (props: YAxisLabelProps) => Widget;
      },
      { data: Data }
    >);

type Layout = CustomConfig<LayoutConfig> | CustomWidget<"Title" | "Chart">;

export type XAxisTick =
  | CustomConfig<Tick>
  | CustomWidget<{}, { data: Data; theme: Theme; index: number }>;

export type YAxisTick =
  | CustomConfig<Tick>
  | CustomWidget<{}, { data: Data; theme: Theme; index: number }>;

type Tick = {
  color?: string;
  thickness?: number;
  length?: number;
};

type Axis = {
  thickness?: number;
  color?: string;
};

type DataLabel =
  | CustomConfig<DataLabelConfig>
  | CustomWidget<
      {},
      {
        value: number;
        index: number;
        legend: string;
        label: string;
        direction: "horizontal" | "vertical";
      }
    >;

type Plot =
  | CustomConfig<PlotConfig>
  | CustomWidget<
      {
        BarGroup: (props: BarGroupProps) => Widget;
      },
      { data: Data }
    >;

export type Chart =
  | CustomConfig<ChartConfig>
  | CustomWidget<{
      Plot: (props: PlotProps) => Widget;
      XAxis: (props: XAxisProps) => Widget;
      YAxis: (props: YAxisProps) => Widget;
    }>;

export type Theme = {
  text: Required<Font>;
  border: {
    color: string;
    width: number;
  };
};

export type Font = {
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  lineHeight?: number;
};
