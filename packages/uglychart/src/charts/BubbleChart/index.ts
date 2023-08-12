import type { Custom, Theme, Data, Scale, Dependencies } from "./types";
import * as defaultComponents from "./components/default";
import { Series, Plot, Chart } from "./components";
import { getScale, getValueEdge } from "../../common/CartesianChart/util";
import { Widget } from "@moonmoonbrothers/flutterjs";
import { DeepPartial } from "../../utils";
import CartesianChartContextRootWidget from "../../common/CartesianChart/CartesianChartContextRootWidget";

class BubbleChart extends CartesianChartContextRootWidget<
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
    const base = super.dependencies;
    return {
      ...base,
      Plot,
      Chart,
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
    const base = super.mergeWithDefaultCustom(custom);
    return {
      ...base,
      bubble: custom?.bubble ?? { type: "config" },
    };
  }
}

export default (...props: ConstructorParameters<typeof BubbleChart>) =>
  new BubbleChart(...props);
export { defaultComponents as DefaultComponents };
