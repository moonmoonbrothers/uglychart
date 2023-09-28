import CartesianChartContextRootWidget from "../../common/CartesianChart/CartesianChartContextRootWidget";
import type { Custom, Dependencies } from "./types";
import * as defaultComponents from "./components/default";
import {
  Scale,
  getScale,
  getValueEdge,
} from "../../common/CartesianChart/util";
import {
  Tooltip,
  Series,
  XAxis,
  YAxis,
  Plot,
  Chart,
  BarGroup,
  Bar,
} from "./components";

export class BarChart extends CartesianChartContextRootWidget<
  Custom,
  Dependencies
> {
  get dependencies(): Dependencies {
    const base = super.dependencies;
    return {
      ...base,
      Series,
      XAxis,
      YAxis,
      Plot,
      Chart,
      BarGroup,
      Bar,
      Tooltip,
    };
  }

  mergeWithDefaultCustom(custom: Partial<Custom>): Custom {
    const base = super.mergeWithDefaultCustom(custom);

    return {
      ...base,
      bar: custom.bar ?? { type: "config" },
      barGroup: custom.barGroup ?? { type: "config" },
      tooltip: custom.tooltip ?? { type: "config" },
    };
  }

  get scale(): Scale {
    const { datasets } = this.data;
    const valueEdge = getValueEdge(datasets.map(({ data }) => data));

    const roughEdge = {
      min: valueEdge.min > 0 ? 0 : valueEdge.min,
      max: valueEdge.max < 0 ? 0 : valueEdge.max,
    };
    const roughStepCount = 10;

    const roughScale: Scale = {
      min: this.scaleConfig?.min ?? roughEdge.min,
      max: this.scaleConfig?.max ?? roughEdge.max,
      step:
        this.scaleConfig?.step ??
        (roughEdge.max - roughEdge.min) / roughStepCount,
    };

    return getScale(roughScale);
  }
}

export default (...props: ConstructorParameters<typeof BarChart>) =>
  new BarChart(...props);
export { defaultComponents as DefaultComponents };
