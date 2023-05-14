import { Widget } from "@moonmoonbrothers/flutterjs";
import {
  Custom as CartesianChartCustom,
  CustomWidget,
  CustomConfig,
  Scale,
} from "../../common/CartesianChart/types";
import { AreaConfig, AreaProps } from "./components/Area";
import { SeriesConfig } from "./components/Series";

export type Custom = CartesianChartCustom & {
  area: CustomArea;
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
      }
    >;

type CustomArea =
  | CustomConfig<AreaConfig>
  | CustomWidget<
      {},
      {
        color: string;
        points: number[];
        minPoint: number;
        maxPoint: number;
      }
    >;
