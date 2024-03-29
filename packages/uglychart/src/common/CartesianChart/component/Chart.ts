import { Alignment, Widget, BuildContext } from "@moonmoonbrothers/flutterjs";
import { Scale } from "../util";
import { Chart as DefaultChart } from "./default";
import CartesianChartContextWidget from "../CartesianChartContextWidget";
import { Custom } from "../types";

export type ChartConfig = {
  scale?: Scale;
  alignment?: Alignment;
  foregroundAdditions?: Widget[];
  backgroundAdditions?: Widget[];
};

export class Chart<
  CUSTOM extends Custom<any, any> = Custom
> extends CartesianChartContextWidget<CUSTOM> {
  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { labels } = data;
    const { chart, yAxis, xAxis, plot } = this.getCustom(context);
    const scale = this.getScale(context);
    const { XAxis, YAxis, Plot } = this.getDependencies(context);

    if (chart.type === "custom") {
      return chart.Custom({ XAxis, YAxis, Plot }, { theme, data });
    }
    const { foregroundAdditions = [], backgroundAdditions = [] } = chart;
    const direction = this.getDirection(context);

    const { xLabels, yLabels } = this.getXAnxYLabels({
      scale,
      labels,
      direction,
    });

    return DefaultChart({
      BackgroundAdditions: backgroundAdditions,
      ForegroundAdditions: foregroundAdditions,
      plotHeight: plot.height,
      plotWidth: plot.width,
      YAxis: YAxis({
        labels: yLabels,
        type: direction === "horizontal" ? "index" : "value",
      }),
      Plot: Plot({ direction }),
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
    direction: "horizontal" | "vertical";
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

  getDirection(context: BuildContext): "horizontal" | "vertical" {
    return "vertical";
  }
}

export default () => new Chart();
