import { EdgeInsets, Widget } from "@moonmoonbrothers/flutterjs";
import CustomTitle, { TitleConfig, Title } from "./component/Title";
import CustomPlot, { PlotProps, PlotConfig, Plot } from "./component/Plot";
import { XAxisProps, XAxis } from "./component/XAxis";
import { YAxisProps, YAxis } from "./component/YAxis";
import { YAxisLabelProps, YAxisLabel } from "./component/YAxisLabel";
import { XAxisLabelProps, XAxisLabel } from "./component/XAxisLabel";
import { LayoutConfig, Layout } from "./component/Layout";
import { Scale as _Scale } from "./util/getScale";
import { ChartConfig, Chart } from "./component/Chart";
import { DataLabelConfig, DataLabel } from "./component/DataLabel";
import type { DeepPartial } from "../../utils";
import { XAxisTickProps, XAxisTick } from "./component/XAxisTick";
import { YAxisTickProps, YAxisTick } from "./component/YAxisTick";
import CustomSeries, { SeriesConfig, Series } from "./component/Series";

export type Dependencies = {
  Plot: (...args: ConstructorParameters<typeof Plot>) => Plot;
  XAxis: (...args: ConstructorParameters<typeof XAxis>) => XAxis;
  YAxis: (...args: ConstructorParameters<typeof YAxis>) => YAxis;
  YAxisLabel: (...args: ConstructorParameters<typeof YAxisLabel>) => YAxisLabel;
  XAxisLabel: (...args: ConstructorParameters<typeof XAxisLabel>) => XAxisLabel;
  Title: (...args: ConstructorParameters<typeof Title>) => Title;
  XAxisTick: (...args: ConstructorParameters<typeof XAxisTick>) => XAxisTick;
  YAxisTick: (...args: ConstructorParameters<typeof YAxisTick>) => YAxisTick;
  DataLabel: (...args: ConstructorParameters<typeof DataLabel>) => DataLabel;
  Layout: (...args: ConstructorParameters<typeof Layout>) => Layout;
  Chart: (...args: ConstructorParameters<typeof Chart>) => Chart;
  Series: (...args: ConstructorParameters<typeof Series>) => Series;
};

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

export type Scale = _Scale;

export type CartesianChartProps = {
  data: Data;
  theme?: DeepPartial<Theme>;
  custom?: Custom;
};

export type CustomConfig<T> = { type: "config" } & T;

export type Custom = {
  title: CustomTitle;
  layout: CustomLayout;
  xAxis: CustomXAxis;
  xAxisLabel: CustomXAxisLabel;
  yAxis: CustomYAxis;
  yAxisLabel: CustomYAxisLabel;
  chart: CustomChart;
  dataLabel: CustomDataLabel;
  xAxisTick: CUstomXAxisTick;
  yAxisTick: CustomYAxisTick;
  plot: CustomPlot;
  series: CustomSeries;
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

type CustomTitle =
  | CustomConfig<TitleConfig>
  | CustomWidget<{}, { text: string }>;

type AxisLabel = {
  margin?: EdgeInsets;
  font?: Font;
};

type CustomXAxisLabel =
  | CustomConfig<AxisLabel>
  | CustomWidget<{}, { text: string; index: number }>;

type CustomYAxisLabel =
  | CustomConfig<AxisLabel>
  | CustomWidget<{}, { text: string; index: number }>;

export type CustomXAxis =
  | CustomConfig<Axis>
  /*
      Must be specified If your custom Axis's thickness and color,
      It will be used to draw intersection between XAxis and YAxis
    */
  | ({ thickness: number; color: string } & CustomWidget<
      {
        XAxisTick: (props: XAxisTickProps) => Widget;
        XAxisLabel: (props: { index: number; text: string }) => Widget;
      },
      { data: Data }
    >);

export type CustomYAxis =
  | CustomConfig<Axis>
  /*
      Must be specified If your custom Axis's thickness and color,
      It will be used to draw intersection between XAxis and YAxis
    */
  | ({ thickness: number; color: string } & CustomWidget<
      {
        YAxisTick: (props: YAxisTickProps) => Widget;
        YAxisLabel: (props: YAxisLabelProps) => Widget;
      },
      { data: Data }
    >);

type CustomLayout =
  | CustomConfig<LayoutConfig>
  | CustomWidget<"Title" | "Chart">;

export type CUstomXAxisTick =
  | CustomConfig<Tick>
  | CustomWidget<{}, { data: Data; theme: Theme; index: number }>;

export type CustomYAxisTick =
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

type CustomDataLabel =
  | CustomConfig<DataLabelConfig>
  | CustomWidget<
      {},
      {
        value: number;
        index: number;
        legend: string;
        label: string;
      }
    >;

type CustomPlot =
  | CustomConfig<PlotConfig>
  /*
      Must be specified If your custom plot has specific size,
      It will be used in Chart to layout it correctly
    */
  | ({ width?: number; height?: number } & CustomWidget<{}, { data: Data }>);

export type CustomChart =
  | CustomConfig<ChartConfig>
  | CustomWidget<{
      Plot: (props: PlotProps) => Widget;
      XAxis: (props: XAxisProps) => Widget;
      YAxis: (props: YAxisProps) => Widget;
    }>;

export type CustomSeries = CustomConfig<SeriesConfig> | CustomWidget<{}>;
