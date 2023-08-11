import CartesianChartContextRootWidget from "../../common/CartesianChart/CartesianChartContextRootWidget";
import type { Custom, Theme, Data, Scale, Dependencies } from "./types";
import * as defaultComponents from "./components/default";
import { Series, Plot, Chart } from "./components";
import { getScale, getValueEdge } from "../../common/CartesianChart/util";
import { Widget } from "@moonmoonbrothers/flutterjs";
import { DeepPartial } from "../../utils";

class ScatterChart extends CartesianChartContextRootWidget<
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
      ...super.dependencies,
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
    };

    return {
      x: getScale(roughScale.x),
      y: getScale(roughScale.y),
    };
  }

  mergeWithDefaultCustom(custom: Partial<Custom>): Custom {
    return {
      ...super.mergeWithDefaultCustom(custom),
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
