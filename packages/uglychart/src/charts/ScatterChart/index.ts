import CartesianChartContextRootWidget from "../../common/CartesianChart/CartesianChartContextRootWidget";
import type { Custom, Theme, Data, Scale, Dependencies } from "./types";
import * as defaultComponents from "./components/default";
import { Series, Plot, Chart } from "./components";
import { getScale, getValueEdge } from "../../common/CartesianChart/util";
import ChartContextRootWidget from "../../common/ChartContextRootWidget";
import { Widget } from "@moonmoonbrothers/flutterjs";
import { DeepPartial } from "../../utils";
import {
  XAxis,
  XAxisLabel,
  XAxisTick,
  YAxis,
  YAxisLabel,
  YAxisTick,
  DataLabel,
  Layout,
  Title,
} from "../../common/CartesianChart/component";

class ScatterChart extends ChartContextRootWidget<
  Custom,
  Dependencies,
  Theme,
  Data,
  Scale
> {
  get root(): Widget {
    return this.dependencies.Layout();
  }

  get dependencies(): Dependencies {
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
    };
  }

  get scale(): Scale {
    const { datasets } = this.data;
    if (this.scaleConfig != null) return this.scaleConfig;

    const valueEdge = {
      x: getValueEdge(datasets.map(({ data }) => data.map(({ x }) => x))),
      y: getValueEdge(datasets.map(({ data }) => data.map(({ y }) => y))),
    };

    const roughEdge = valueEdge

    const roughStepCount = 10;
    const roughScale: Scale = {
      x: {
        min: roughEdge.x.min,
        max: roughEdge.x.max,
        step: (roughEdge.x.max - roughEdge.x.min) / roughStepCount,
      },
      y: {
        min: roughEdge.y.min,
        max: roughEdge.y.max,
        step: (roughEdge.y.max - roughEdge.y.min) / roughStepCount,
      },
    };

    return {
      x: getScale(roughScale.x),
      y: getScale(roughScale.y),
    };
  }

  mergeWithDefaultCustom(custom: Partial<Custom>): Custom {
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
      scatter: custom?.scatter ?? { type: "config" },
    };
  }

  mergeWithDefaultTheme(theme: DeepPartial<Theme>): Theme {
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
    };
  }
}

export default (...props: ConstructorParameters<typeof ScatterChart>) =>
  new ScatterChart(...props);
export { defaultComponents as DefaultComponents };
