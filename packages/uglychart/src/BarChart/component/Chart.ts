import {
  Alignment,
  ComponentWidget,
  Widget,
  BuildContext,
} from "@moonmoonbrothers/flutterjs";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";
import XAxis from "./XAxis";
import YAxis from "./YAxis";
import Plot from "./Plot";
import { getScale, getValueEdge, Scale } from "../util";
import { Chart as DefaultChart } from "./default";

export type ChartConfig = {
  width?: number;
  height?: number;
  scale?: Partial<Scale>;
  direction?: "horizontal" | "vertical";
  alignment?: Alignment;
  foregroundAdditions?: Widget[];
  backgroundAdditions?: Widget[];
};

class Chart extends ComponentWidget {
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context);
    const data = DataProvider.of(context);
    const { labels, datasets } = DataProvider.of(context);
    const { chart, yAxis, xAxis, plot } = CustomProvider.of(context);
    if (chart.type === "custom") {
      return chart.Custom({ XAxis, YAxis, Plot }, { theme, data });
    }

    const valueEdge = getValueEdge(datasets.map(({ data }) => data));

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

    const suggestedScale = getScale(roughScale);

    const {
      direction = "horizontal",
      scale: scaleOption,
      foregroundAdditions = [],
      backgroundAdditions = [],
      width,
      height,
    } = chart;

    const scale: Scale = {
      min: scaleOption?.min ?? suggestedScale.min,
      max: scaleOption?.max ?? suggestedScale.max,
      step: scaleOption?.step ?? suggestedScale.step,
    };

    const { min, max, step } = scale;

    const valueLabels = Array.from(
      { length: Math.floor((max - min) / step) + 1 },
      (_, i) => `${step * i + min}`
    );
    const indexLabels = labels;

    const [xLabels, yLabels] =
      direction === "horizontal"
        ? [valueLabels, indexLabels]
        : [indexLabels, valueLabels];

    return DefaultChart({
      BackgroundAdditions: backgroundAdditions,
      ForegroundAdditions: foregroundAdditions,
      plotHeight: plot.height,
      plotWidth: plot.width,
      width,
      height,
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
}

export default () => new Chart();
