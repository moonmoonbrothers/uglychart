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
import type { CustomConfig, CustomWidget } from "../type";
import ChartContextWidget from "../ChartContextWidget";

export type Dependencies = {
  Plot: (
    ...args: ConstructorParameters<typeof Plot>
  ) => ChartContextWidget<any, any, any, any, any>;
  XAxis: (
    ...args: ConstructorParameters<typeof XAxis>
  ) => ChartContextWidget<any, any, any, any, any>;
  YAxis: (
    ...args: ConstructorParameters<typeof YAxis>
  ) => ChartContextWidget<any, any, any, any, any>;
  YAxisLabel: (
    ...args: ConstructorParameters<typeof YAxisLabel>
  ) => ChartContextWidget<any, any, any, any, any>;
  XAxisLabel: (
    ...args: ConstructorParameters<typeof XAxisLabel>
  ) => ChartContextWidget<any, any, any, any, any>;
  Title: (
    ...args: ConstructorParameters<typeof Title>
  ) => ChartContextWidget<any, any, any, any, any>;
  XAxisTick: (
    ...args: ConstructorParameters<typeof XAxisTick>
  ) => ChartContextWidget<any, any, any, any, any>;
  YAxisTick: (
    ...args: ConstructorParameters<typeof YAxisTick>
  ) => ChartContextWidget<any, any, any, any, any>;
  DataLabel: (
    ...args: ConstructorParameters<typeof DataLabel>
  ) => ChartContextWidget<any, any, any, any, any>;
  Layout: (
    ...args: ConstructorParameters<typeof Layout>
  ) => ChartContextWidget<any, any, any, any, any>;
  Chart: (
    ...args: ConstructorParameters<typeof Chart>
  ) => ChartContextWidget<any, any, any, any, any>;
  Series: (
    ...args: ConstructorParameters<typeof Series>
  ) => ChartContextWidget<any, any, any, any, any>;
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
  custom?: Custom<Theme, Data>;
};

export type Custom<THEME = Theme, DATA = Data> = {
  title: CustomTitle<THEME, DATA>;
  layout: CustomLayout<THEME, DATA>;
  xAxis: CustomXAxis<THEME, DATA>;
  xAxisLabel: CustomXAxisLabel<THEME, DATA>;
  yAxis: CustomYAxis<THEME, DATA>;
  yAxisLabel: CustomYAxisLabel<THEME, DATA>;
  chart: CustomChart<THEME, DATA>;
  dataLabel: CustomDataLabel<THEME, DATA>;
  xAxisTick: CUstomXAxisTick<THEME, DATA>;
  yAxisTick: CustomYAxisTick<THEME, DATA>;
  plot: CustomPlot<THEME, DATA>;
  series: CustomSeries<THEME, DATA>;
};

export type Data = {
  title?: string;
  labels: string[];
  datasets: {
    legend: string;
    data: number[];
  }[];
};

export type CustomTitle<THEME, DATA> =
  | CustomConfig<TitleConfig>
  | CustomWidget<{}, { text: string }, THEME, DATA>;

type AxisLabel = {
  margin?: EdgeInsets;
  font?: Font;
};

export type CustomXAxisLabel<THEME, DATA> =
  | CustomConfig<AxisLabel>
  | CustomWidget<{}, { text: string; index: number }, THEME, DATA>;

export type CustomYAxisLabel<THEME, DATA> =
  | CustomConfig<AxisLabel>
  | CustomWidget<{}, { text: string; index: number }, THEME, DATA>;

export type CustomXAxis<THEME, DATA> =
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
      { data: Data },
      THEME,
      DATA
    >);

export type CustomYAxis<THEME = Theme, DATA = Data> =
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
      { data: Data },
      THEME,
      DATA
    >);

type CustomLayout<THEME, DATA> =
  | CustomConfig<LayoutConfig>
  | CustomWidget<"Title" | "Chart", THEME, DATA>;

export type CUstomXAxisTick<THEME, DATA> =
  | CustomConfig<Tick>
  | CustomWidget<{}, { data: Data; theme: Theme; index: number }, THEME, DATA>;

export type CustomYAxisTick<THEME, DATA> =
  | CustomConfig<Tick>
  | CustomWidget<{}, { data: Data; theme: Theme; index: number }, THEME, DATA>;

type Tick = {
  color?: string;
  thickness?: number;
  length?: number;
};

type Axis = {
  thickness?: number;
  color?: string;
};

export type CustomDataLabel<THEME, DATA> =
  | CustomConfig<DataLabelConfig>
  | CustomWidget<
      {},
      {
        value: number;
        index: number;
        legend: string;
        label: string;
      },
      THEME,
      DATA
    >;

export type CustomPlot<THEME, DATA> =
  | CustomConfig<PlotConfig>
  /*
      Must be specified If your custom plot has specific size,
      It will be used in Chart to layout it correctly
    */
  | ({ width?: number; height?: number } & CustomWidget<{}, {}, THEME, DATA>);

export type CustomChart<THEME, DATA> =
  | CustomConfig<ChartConfig>
  | CustomWidget<
      {
        Plot: (props: PlotProps) => Widget;
        XAxis: (props: XAxisProps) => Widget;
        YAxis: (props: YAxisProps) => Widget;
      },
      {},
      THEME,
      DATA
    >;

export type CustomSeries<THEME, DATA> =
  | CustomConfig<SeriesConfig>
  | CustomWidget<{}, {}, THEME, DATA>;
