import { Custom, Theme, Data, Dependencies, Font, Scale } from "./types";
import ChartContextRootWidget from "../ChartContextRootWidget";
import { Widget } from "@moonmoonbrothers/flutterjs";
import {
  XAxis,
  XAxisLabel,
  XAxisTick,
  YAxis,
  YAxisLabel,
  YAxisTick,
  Plot,
  Chart,
  DataLabel,
  Layout,
  Series,
  Title,
} from "./component";
import { DeepPartial } from "../../utils";
import ChartContextWidget from "../ChartContextWidget";

class CartesianChartContextRootWidget<
  CUSTOM extends Custom<any, any> = Custom,
  DEPENDENCIES extends Record<
    string,
    (...arg: any) => ChartContextWidget<any, any, any, any, any>
  > = Dependencies,
  THEME extends Theme = Theme,
  DATA = Data,
  SCALE = Scale
> extends ChartContextRootWidget<CUSTOM, DEPENDENCIES, THEME, DATA, SCALE> {
  get root(): Widget {
    return this.dependencies.Layout();
  }

  get dependencies(): DEPENDENCIES {
    return {
      Title,
      XAxis,
      XAxisLabel,
      XAxisTick,
      YAxis,
      YAxisLabel,
      YAxisTick,
      Plot,
      Chart,
      DataLabel,
      Layout,
      Series,
    } as any;
  }

  mergeWithDefaultTheme(theme: DeepPartial<Theme>): THEME {
    return {
      text: {
        color: theme?.text?.color || "black",
        fontFamily: theme?.text?.fontFamily || "Noto Sans KR, sans-serif",
        fontSize: theme?.text?.fontSize || 11,
        lineHeight: theme?.text?.lineHeight || 1,
      },
      border: {
        width: theme?.border?.width || 1,
        color: theme?.border?.color || "black",
      },
    } as THEME;
  }

  mergeWithDefaultCustom(custom: Partial<CUSTOM>): CUSTOM {
    return {
      plot: custom?.plot ?? { type: "config" },
      layout: custom?.layout ?? { type: "config" },
      title: custom?.title ?? { type: "config" },
      xAxis: custom?.xAxis ?? { type: "config" },
      yAxis: custom?.yAxis ?? { type: "config" },
      xAxisLabel: custom?.xAxisLabel ?? { type: "config" },
      yAxisLabel: custom?.yAxisLabel ?? { type: "config" },
      chart: custom?.chart ?? { type: "config" },
      dataLabel: custom?.dataLabel ?? { type: "config" },
      xAxisTick: custom?.xAxisTick ?? { type: "config" },
      yAxisTick: custom?.yAxisTick ?? { type: "config" },
      series: custom?.series ?? { type: "config" },
    } as CUSTOM;
  }
}

export default CartesianChartContextRootWidget;
