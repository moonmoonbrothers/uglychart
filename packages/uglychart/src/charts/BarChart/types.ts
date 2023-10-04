import { Widget } from "@moonmoonbrothers/flutterjs";
import {
  Custom as CartesianChartCustom,
  Theme as CartesianChartTheme,
  Data as CartesianChartData,
  Scale,
} from "../../common/CartesianChart/types";
import { Dependencies as CartesianDependencies } from "../../common/CartesianChart/types";
import Bar, { BarConfig, BarProps } from "./components/Bar";
import Tooltip, { TooltipProps, TooltipConfig } from "./components/Tooltip";
import BarGroup, { BarGroupProps, BarGroupConfig } from "./components/BarGroup";
import { ChartConfig } from "./components/Chart";
import { SeriesConfig } from "./components/Series";
import type { CustomConfig, CustomWidget } from "../../common/type";
import Plot from "./components/Plot";
import { PlotProps } from "../../common/CartesianChart/component/Plot";
import { XAxisProps } from "../../common/CartesianChart/component/XAxis";
import { YAxisProps } from "./components/YAxis";
import { DataLabelProps } from "../../common/CartesianChart/component/DataLabel";

export type Custom = Omit<CartesianChartCustom, "chart"> & {
  bar: CustomBar;
  barGroup: CustomBarGroup;
  series: CustomSeries;
  chart: CustomChart;
  tooltip: CustomTooltip;
};

type CustomChart =
  | CustomConfig<ChartConfig>
  | CustomWidget<
      {
        Plot: (props: PlotProps) => Widget;
        XAxis: (props: XAxisProps) => Widget;
        YAxis: (props: YAxisProps) => Widget;
      },
      {}
    >;

type CustomSeries =
  | CustomConfig<SeriesConfig>
  | CustomWidget<
      {
        BarGroup: (props: BarGroupProps) => Widget;
      },
      {
        scale: Scale;
        direction: "horizontal" | "vertical";
      }
    >;

type CustomBar =
  | CustomConfig<BarConfig>
  | CustomWidget<
      {},
      {
        backgroundColor: string;
        index: number;
        label: string;
        legend: string;
        direction: "vertical" | "horizontal";
      }
    >;

type CustomBarGroup =
  | CustomConfig<BarGroupConfig>
  | CustomWidget<
      {
        Bar: (props: BarProps) => Widget;
        DataLabel: (props: DataLabelProps) => Widget;
        Tooltip: (props: TooltipProps) => Widget;
      },
      {
        scale: Scale;
        direction: "horizontal" | "vertical";
      }
    >;
type CustomTooltip = CustomConfig<TooltipConfig> | CustomWidget<{}, {}>;

export type Theme = CartesianChartTheme;
export type Data = CartesianChartData;
export type Dependencies = Omit<CartesianDependencies, "Plot"> & {
  Plot: (...props: Parameters<typeof Plot>) => ReturnType<typeof Plot>;
  BarGroup: (
    ...props: Parameters<typeof BarGroup>
  ) => ReturnType<typeof BarGroup>;
  Bar: (...props: Parameters<typeof Bar>) => ReturnType<typeof Bar>;
  Tooltip: (...props: Parameters<typeof Tooltip>) => ReturnType<typeof Tooltip>;
};
