import { Widget } from "@moonmoonbrothers/flutterjs";
import {
  Custom as CartesianChartCustom,
  Theme as CartesianChartTheme,
  Scale as CartesianChartScale,
  Dependencies as CartesianChartDependencies,
} from "../../common/CartesianChart/types";
import { AreaConfig, AreaProps } from "./components/Area";
import { Series, SeriesConfig } from "./components/Series";
import type { CustomConfig, CustomWidget } from "../../common/type";

export type Custom = CartesianChartCustom<Theme, Data> & {
  series: CustomSeries;
};

type CustomSeries =
  | CustomConfig<SeriesConfig>
  | CustomWidget<
      {
        Line: (props: AreaProps) => Widget;
      },
      {
        scale: Scale;
        direction: "horizontal" | "vertical";
      },
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

export type Dependencies = Omit<CartesianChartDependencies, "Series"> & {
  Series: (...props: ConstructorParameters<typeof Series>) => Series;
};
