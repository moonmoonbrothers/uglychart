import { Alignment, Widget, BuildContext } from "@moonmoonbrothers/flutterjs";
import { getScale, getValueEdge, Scale } from "../util";
import { Chart as DefaultChart } from "./default";
import CartesianChartContextWidget from "../CartesianChartContextWidget";

export type ChartConfig = {
  scale?: Scale;
  direction?: "horizontal" | "vertical";
  alignment?: Alignment;
  foregroundAdditions?: Widget[];
  backgroundAdditions?: Widget[];
};

export class Chart extends CartesianChartContextWidget {
  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { labels } = data;
    const { chart, yAxis, xAxis, plot } = this.getCustom(context);
    const scale = this.resolveScale(context);
    const { XAxis, YAxis, Plot } = this.getDependencies(context);

    if (chart.type === "custom") {
      return chart.Custom({ XAxis, YAxis, Plot }, { theme, data });
    }
    const {
      direction = "horizontal",
      foregroundAdditions = [],
      backgroundAdditions = [],
    } = chart;

    const { xLabels, yLabels } = this.getXAnxYLabels({ scale, labels });

    return DefaultChart({
      BackgroundAdditions: backgroundAdditions,
      ForegroundAdditions: foregroundAdditions,
      plotHeight: plot.height,
      plotWidth: plot.width,
      YAxis: YAxis({
        labels: yLabels,
        type: direction === "horizontal" ? "index" : "value",
      }),
      Plot: Plot({ direction, scale }),
      XAxis: XAxis({
        labels: xLabels,
        type: direction === "vertical" ? "index" : "value",
      }),
      yAxisThickness: yAxis.thickness ?? theme.border.width,
      xAxisThickness: xAxis.thickness ?? theme.border.width,
      xAxisColor: xAxis.color ?? theme.border.color,
      yAxisColor: yAxis.color ?? theme.border.color,
    });
  }

  getXAnxYLabels({
    scale,
    labels,
    direction,
  }: {
    scale: Scale;
    labels: string[];
    direction?: "horizontal" | "vertical";
  }): {
    xLabels: string[];
    yLabels: string[];
  } {
    const { min, max, step } = scale;

    const valueLabels = Array.from(
      { length: Math.floor((max - min) / step) + 1 },
      (_, i) => `${step * i + min}`
    );
    const indexLabels = labels;

    return {
      xLabels: direction === "horizontal" ? valueLabels : indexLabels,
      yLabels: direction === "horizontal" ? indexLabels : valueLabels,
    };
  }

  resolveScale(context: BuildContext): Scale {
    const { datasets } = this.getData(context);
    const { chart } = this.getCustom(context);
    if (chart.type === "config" && chart.scale != null) return chart.scale;

    const valueEdge = getValueEdge(datasets.map(({ data }) => data));

    const roughEdge = {
      min: valueEdge.min > 0 ? 0 : valueEdge.min,
      max: valueEdge.max < 0 ? 0 : valueEdge.max,
    };
    /* 
      chart size에 따라 보정 필요!
      MediaQuery.of(context).size 를 통해 수정할듯
    */
    const roughStepCount = 10;

    const roughScale: Scale = {
      min: roughEdge.min,
      max: roughEdge.max,
      step: (roughEdge.max - roughEdge.min) / roughStepCount,
    };

    return getScale(roughScale);
  }
}

export default () => new Chart();