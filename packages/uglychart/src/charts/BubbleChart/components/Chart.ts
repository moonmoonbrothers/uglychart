import { Alignment, Widget, BuildContext } from "@moonmoonbrothers/flutterjs";
import { Chart as DefaultChart } from "./default";
import { Scale, Data, Theme, Custom, Dependencies } from "../types";
import ChartContextWidget from "../../../common/ChartContextWidget";

export type ChartConfig = {
  scale?: Scale;
  alignment?: Alignment;
  foregroundAdditions?: Widget[];
  backgroundAdditions?: Widget[];
};

export class Chart extends ChartContextWidget<
  Custom,
  Dependencies,
  Theme,
  Data,
  Scale
> {
  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { chart, yAxis, xAxis, plot } = this.getCustom(context);
    const scale = this.getScale(context);
    const { XAxis, YAxis, Plot } = this.getDependencies(context);

    if (chart.type === "custom") {
      return chart.Custom({ XAxis, YAxis, Plot }, { theme, data });
    }
    const { foregroundAdditions = [], backgroundAdditions = [] } = chart;

    const { xLabels, yLabels } = this.getXAnxYLabels({
      scale,
    });

    return DefaultChart({
      BackgroundAdditions: backgroundAdditions,
      ForegroundAdditions: foregroundAdditions,
      plotHeight: plot.height,
      plotWidth: plot.width,
      YAxis: YAxis({
        labels: yLabels,
        type: "value",
      }),
      Plot: Plot({}),
      XAxis: XAxis({
        labels: xLabels,
        type: "value",
      }),
      yAxisThickness: yAxis.thickness ?? theme.border.width,
      xAxisThickness: xAxis.thickness ?? theme.border.width,
      xAxisColor: xAxis.color ?? theme.border.color,
      yAxisColor: yAxis.color ?? theme.border.color,
    });
  }

  getXAnxYLabels({ scale }: { scale: Scale }): {
    xLabels: string[];
    yLabels: string[];
  } {
    return {
      xLabels: this.getLabels(scale.x),
      yLabels: this.getLabels(scale.y),
    };
  }

  private getLabels({
    min,
    max,
    step,
  }: {
    min: number;
    max: number;
    step: number;
  }) {
    return Array.from(
      { length: Math.floor((max - min) / step) + 1 },
      (_, i) => `${step * i + min}`
    );
  }
}

export default () => new Chart();
