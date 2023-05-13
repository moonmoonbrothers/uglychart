import CartesianChartContextRootWidget from "../../common/CartesianChart/CartesianChartContextRootWidget";
import type { Custom } from "./types";
import * as defaultComponents from "./components/default";
import { Dependencies } from "../../common/CartesianChart/types";
import Series from "./components/Series";
import XAxis from "./components/XAxis";
import YAxis from "./components/YAxis";
import Plot from "./components/Plot";
class BarChart extends CartesianChartContextRootWidget<Custom> {
  get dependencies(): Dependencies {
    const base = super.dependencies;
    return {
      ...base,
      Series,
      XAxis,
      YAxis,
      Plot,
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
}

export default (...props: ConstructorParameters<typeof BarChart>) =>
  new BarChart(...props);
export { defaultComponents as DefaultComponents };
