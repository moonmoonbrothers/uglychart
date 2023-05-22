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

class BubbleChart extends ChartContextRootWidget<
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

    const valueEdge = {
      x: getValueEdge(datasets.map(({ data }) => data.map(({ x }) => x))),
      y: getValueEdge(datasets.map(({ data }) => data.map(({ y }) => y))),
      value: getValueEdge(
        datasets.map(({ data }) => data.map(({ value }) => value))
      ),
    };

    const roughEdge = valueEdge;

    const roughStepCount = 10;
    const roughScale: Scale = {
      x: {
        min: this.scaleConfig?.x?.min ?? roughEdge.x.min,
        max: this.scaleConfig?.x?.max ?? roughEdge.x.max,
        step:
          this.scaleConfig?.x?.step ??
          (roughEdge.x.max - roughEdge.x.min) / roughStepCount,
      },
      y: {
        min: this.scaleConfig?.y?.min ?? roughEdge.y.min,
        max: this.scaleConfig?.y?.max ?? roughEdge.y.max,
        step:
          this.scaleConfig?.y?.step ??
          (roughEdge.y.max - roughEdge.y.min) / roughStepCount,
      },
      value: {
        min: this.scaleConfig?.value?.min ?? roughEdge.value.min,
        max: this.scaleConfig?.value?.max ?? roughEdge.value.max,
      },
    };

    return {
      x: getScale(roughScale.x),
      y: getScale(roughScale.y),
      value: getScale({
        ...roughScale.value,
        step: (roughEdge.value.max - roughEdge.value.min) / roughStepCount,
      }),
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
      bubble: custom?.bubble ?? { type: "config" },
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

export default (...props: ConstructorParameters<typeof BubbleChart>) =>
  new BubbleChart(...props);
export { defaultComponents as DefaultComponents };
