import { Widget } from "@moonmoonbrothers/flutterjs";
import {
  Custom as CartesianChartCustom,
  Theme as CartesianChartTheme,
  Scale as CartesianChartScale,
  Dependencies as CartesianChartDependencies,
} from "../../common/CartesianChart/types";
import type { BubbleConfig, BubbleProps } from "./components/Bubble";
import { Series, SeriesConfig } from "./components/Series";
import { Chart } from "./components/Chart";
import { Plot } from "./components/Plot";
import type { CustomConfig, CustomWidget } from "../../common/type";

export type Custom = CartesianChartCustom<Theme, Data> & {
  series: CustomSeries;
  bubble: CustomBubble;
};

type CustomSeries =
  | CustomConfig<SeriesConfig>
  | CustomWidget<
      {
        Bubble: (props: BubbleProps) => Widget;
      },
      {
        scale: Scale;
      },
      Theme,
      Data
    >;

type CustomBubble =
  | CustomConfig<BubbleConfig>
  | CustomWidget<
      {},
      {
        scale: Scale;
      } & BubbleProps,
      Theme,
      Data
    >;

export type Theme = CartesianChartTheme;
export type Data = {
  title?: string;
  datasets: {
    legend: string;
    data: { x: number; y: number; value: number; label?: string }[];
  }[];
};

export type Scale = {
  x: CartesianChartScale;
  y: CartesianChartScale;
  value: {
    min: number
    max: number
  }
};

export type Dependencies = Omit<
  CartesianChartDependencies,
  "Series" | "Plot" | "Chart"
> & {
  Series: (...props: ConstructorParameters<typeof Series>) => Series;
  Plot: (...props: ConstructorParameters<typeof Plot>) => Plot;
  Chart: (...props: ConstructorParameters<typeof Chart>) => Chart;
};
