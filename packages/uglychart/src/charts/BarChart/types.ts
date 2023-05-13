import { Widget } from "@moonmoonbrothers/flutterjs";
import {
  Custom as CartesianChartCustom,
  CustomWidget,
  CustomConfig,
  Scale,
} from "../../common/CartesianChart/types";
import { BarConfig, BarProps } from "./components/Bar";
import { BarGroupProps, BarGroupConfig } from "./components/BarGroup";
import { SeriesConfig } from "./components/Series";

export type Custom = CartesianChartCustom & {
  bar: CustomBar;
  barGroup: CustomBarGroup;
  series: CustomSeries
};

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
      },
      {
        scale: Scale;
        direction: "horizontal" | "vertical";
      }
    >;
