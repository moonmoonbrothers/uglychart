import { getStackValueEdge } from "./util/getStackValueEdge";
import { Scale, getScale } from "../../common/CartesianChart/util";
import * as defaultComponents from "./components/default";
import type { Custom, Dependencies } from "./types";
import CartesianChartContextRootWidget from "../../common/CartesianChart/CartesianChartContextRootWidget";
import { Series, XAxis, YAxis, Plot, Chart, BarGroup, Bar } from "./components";

export class StackedBarChart extends CartesianChartContextRootWidget<
  Custom,
  Dependencies
> {
  get dependencies(): Dependencies {
    return {
      ...super.dependencies,
      Series,
      XAxis,
      YAxis,
      Plot,
      Chart,
      BarGroup,
      Bar,
    };
  }

  mergeWithDefaultCustom(custom: Partial<Custom>): Custom {
    const base = super.mergeWithDefaultCustom(custom);

    return {
      ...base,
      bar: custom.bar ?? { type: "config" },
      barGroup: custom.barGroup ?? { type: "config" },
    };
  }
  get scale(): Scale {
    const { datasets } = this.data;
    const valueEdge = getStackValueEdge(datasets.map(({ data }) => data));

    const roughEdge = {
      min: valueEdge.min > 0 ? 0 : valueEdge.min,
      max: valueEdge.max < 0 ? 0 : valueEdge.max,
    };
    const roughStepCount = 10; /* chart size에 따라 보정 필요!*/

    const roughScale: Scale = {
      min: roughEdge.min,
      max: roughEdge.max,
      step: (roughEdge.max - roughEdge.min) / roughStepCount,
    };

    return getScale(roughScale);
  }
}

export default (...props: ConstructorParameters<typeof StackedBarChart>) =>
  new StackedBarChart(...props);
export { defaultComponents as DefaultComponents };
