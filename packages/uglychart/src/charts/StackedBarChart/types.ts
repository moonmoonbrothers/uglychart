import { Widget } from "@moonmoonbrothers/flutterjs";
import { Scale } from "../../common/CartesianChart/types";
import { BarGroupConfig } from "./components/BarGroup";
import type { CustomConfig, CustomWidget } from "../../common/type";
import type { BarProps } from "../BarChart/components/Bar";
import type {
  Custom as BarChartCustom,
  Dependencies as BarChartDependencies,
} from "../BarChart/types";

export type Custom = Omit<BarChartCustom, "barGroup"> & {
  barGroup: CustomBarGroup;
};

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

export type Dependencies = BarChartDependencies;
