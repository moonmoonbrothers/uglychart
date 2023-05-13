import { Custom, Theme, Data, Dependencies, Font } from "./types";
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
  Series
} from './component'

class CartesianChartContextRootWidget<
  CUSTOM extends Custom = Custom,
  DEPENDENCIES extends Dependencies = Dependencies,
  THEME extends Theme = Theme,
  DATA extends Data = Data
> extends ChartContextRootWidget<CUSTOM, DEPENDENCIES, THEME, DATA> {
  get root(): Widget {
    return this.dependencies.Layout();
  }
  get dependencies(): DEPENDENCIES {
    return {
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
      Series
    } as DEPENDENCIES;
  }

  mergeWithDefaultTheme(theme: Partial<THEME>): THEME {
    return {
      text: {
        color: theme?.text?.color || "black",
        fontFamily: theme?.text?.fontFamily || "Noto Sans KR, sans-serif",
        fontSize: theme?.text?.fontSize || 16,
        lineHeight: theme?.text?.lineHeight || 1,
      },
      border: {
        width: theme?.border?.width || 2,
        color: theme?.border?.color || "black",
      },
    } as THEME;
  }

  mergeWithDefaultCustom(custom: Partial<CUSTOM>): CUSTOM {
    return {
      plot: custom?.plot ?? { type: "config" as const },
      layout: custom?.layout ?? { type: "config" as const },
      title: custom?.title ?? { type: "config" as const },
      xAxis: custom?.xAxis ?? { type: "config" as const },
      yAxis: custom?.yAxis ?? { type: "config" as const },
      xAxisLabel: custom?.xAxisLabel ?? { type: "config" as const },
      yAxisLabel: { type: "config" as const },
      chart: { type: "config" as const },
      dataLabel: { type: "config" as const },
      xAxisTick: { type: "config" as const },
      yAxisTick: { type: "config" as const },
    } as CUSTOM;
  }
}

export default CartesianChartContextRootWidget;
