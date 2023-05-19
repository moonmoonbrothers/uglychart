import { Widget } from "@moonmoonbrothers/flutterjs";
import {
  Custom as CartesianChartCustom,
  Theme as CartesianChartTheme,
  Scale as CartesianChartScale,
  Dependencies as CartesianChartDependencies,
} from "../../common/CartesianChart/types";
import type { ScatterConfig, ScatterProps } from "./components/Scatter";
import { Series, SeriesConfig } from "./components/Series";
import { Chart } from "./components/Chart";
import { Plot } from "./components/Plot";
import type { CustomConfig, CustomWidget } from "../../common/type";

export type Custom = CartesianChartCustom<Theme, Data> & {
  series: CustomSeries;
  scatter: CustomScatter;
};

type CustomSeries =
  | CustomConfig<SeriesConfig>
  | CustomWidget<
      {
        Line: (props: ScatterProps) => Widget;
      },
      {
        scale: Scale;
      },
      Theme,
      Data
    >;

type CustomScatter =
  | CustomConfig<ScatterConfig>
  | CustomWidget<
      {},
      {
        scale: Scale;
      } & ScatterProps,
      Theme,
      Data
    >;

export type Theme = CartesianChartTheme;
export type Data = {
  title?: string;
  datasets: {
    legend: string;
    data: { x: number; y: number }[];
  }[];
};

export type Scale = {
  x: CartesianChartScale;
  y: CartesianChartScale;
};

export type Dependencies = Omit<
  CartesianChartDependencies,
  "Series" | "Plot" | "Chart"
> & {
  Series: (...props: ConstructorParameters<typeof Series>) => Series;
  Plot: (...props: ConstructorParameters<typeof Plot>) => Plot;
  Chart: (...props: ConstructorParameters<typeof Chart>) => Chart;
};
