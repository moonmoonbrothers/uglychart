import {
  Align,
  Alignment,
  ComponentWidget,
  Container,
  Grid,
  IntrinsicHeight,
  IntrinsicWidth,
  Positioned,
  Stack,
  Widget,
  BuildContext,
  Text,
  Opacity,
  BoxDecoration,
  Border,
  BorderSide,
} from "@moonmoonbrothers/flutterjs";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";
import XAxis from "./XAxis";
import YAxis from "./YAxis";
import Plot from "./Plot";
import { getScale, getValueEdge, Scale } from "../util";

class Chart extends ComponentWidget {
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context);
    const data = DataProvider.of(context);
    const { labels, datasets } = DataProvider.of(context);
    const { chart, additions, yAxis, xAxis } = CustomProvider.of(context);
    if (chart.type === "custom") {
      return chart.Custom({ XAxis, YAxis, Plot }, { theme, data });
    }

    /* scale 구하기 */
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

    const { direction = "horizontal", scale: scaleOption } = chart;

    const scale: Scale = {
      min: scaleOption?.min ?? suggestedScale.min,
      max: scaleOption?.max ?? suggestedScale.max,
      step: scaleOption?.step ?? suggestedScale.step,
    };

    const { min, max, step } = scale;

    /* label 생성 */
    const valueLabels = Array.from(
      { length: Math.floor((max - min) / step) + 1 },
      (_, i) => `${step * i + min}`
    );
    const indexLabels = labels;

    const [xLabels, yLabels] =
      direction === "horizontal"
        ? [valueLabels, indexLabels]
        : [indexLabels, valueLabels];

    return Align({
      alignment: Alignment.topCenter,
      child: Stack({
        clipped: false,
        children: [
          Container({
            child: Grid({
              childrenByRow: [
                [
                  YAxis({
                    labels: yLabels,
                    type: direction === "horizontal" ? "index" : "value",
                  }),
                  Plot({ direction, scale }),
                ],
                [
                  Container({
                    alignment: Alignment.topRight,
                    child: Container({
                      width:
                        (yAxis.type === "config"
                          ? yAxis.thickness
                          : undefined) ?? theme.border.width,
                      height:
                        (xAxis.type === "config"
                          ? xAxis.thickness
                          : undefined) ?? theme.border.width,
                      decoration: new BoxDecoration({
                        border: new Border({
                          left: new BorderSide({
                            color:
                              (yAxis.type === "config"
                                ? yAxis.color
                                : undefined) ?? theme.border.color,
                            width:
                              (yAxis.type === "config"
                                ? yAxis.thickness
                                : undefined) ?? theme.border.width,
                          }),
                          bottom: new BorderSide({
                            color:
                              (xAxis.type === "config"
                                ? xAxis.color
                                : undefined) ?? theme.border.color,
                            width:
                              (xAxis.type === "config"
                                ? xAxis.thickness
                                : undefined) ?? theme.border.width,
                          }),
                        }),
                      }),
                    }),
                  }),
                  XAxis({
                    labels: xLabels,
                    type: direction === "vertical" ? "index" : "value",
                  }),
                ],
              ],
              templateColumns: [Grid.ContentFit(), Grid.Fr(1)],
              templateRows: [Grid.Fr(1), Grid.ContentFit()],
            }),
          }),
          ...additions,
        ],
      }),
    });
  }
}

export default () => new Chart();
