import { Widget } from "@moonmoonbrothers/flutterjs";
import {
  Custom as CartesianChartCustom,
  CustomWidget,
  CustomConfig,
  Scale,
} from "../../common/CartesianChart/types";
import { LineConfig, LineProps } from "./components/Line";
import { SeriesConfig } from "./components/Series";

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
        points: number[]
        minPoint: number
        maxPoint: number
      }
    >;
