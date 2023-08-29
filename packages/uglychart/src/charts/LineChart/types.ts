import { Widget } from "@moonmoonbrothers/flutterjs";
import {
  Custom as CartesianChartCustom,
  Theme as CartesianChartTheme,
  Data as CartesianChartData,
  Scale,
} from "../../common/CartesianChart/types";
import { LineConfig, LineProps } from "./components/Line";
import { SeriesConfig } from "./components/Series";
import type { CustomConfig, CustomWidget } from "../../common/type";

export type Custom = CartesianChartCustom & {
  line: CustomLine;
  series: CustomSeries;
};

type CustomSeries =
  | CustomConfig<SeriesConfig>
  | CustomWidget<
      {
        Line: (props: LineProps) => Widget;
      },
      {
        scale: Scale;
        direction: "horizontal" | "vertical";
      }
    >;

type CustomLine =
  | CustomConfig<LineConfig>
  | CustomWidget<
      {},
      {
        color: string;
        points: number[];
        minPoint: number;
        maxPoint: number;
      }
    >;
