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
} from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { CustomProvider, DataProvider, ThemeProvider } from "../provider"
import XAxis from "./XAxis"
import YAxis from "./YAxis"
import Plot from "./Plot"
import { getScale, getValueEdge, Scale } from "../util"

class Chart extends ComponentWidget {
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context)
    const { labels, datasets } = DataProvider.of(context)
    const { chart, additions } = CustomProvider.of(context)
    if (chart.type === "custom") {
      return chart.Custom({ XAxis, YAxis, Plot }, { theme })
    }

    /* scale 구하기 */
    const valueEdge = getValueEdge(datasets.map(({ data }) => data))

    const roughEdge = {
      min: valueEdge.min > 0 ? 0 : valueEdge.min,
      max: valueEdge.max,
    }
    const roughStepCount = 10 /* chart size에 따라 보정 필요!*/

    const roughScale: Scale = {
      min: valueEdge.min > 0 ? 0 : valueEdge.min,
      max: valueEdge.max,
      step: (roughEdge.max - roughEdge.min) / roughStepCount,
    }

    const suggestedScale = getScale(roughScale)

    const { direction = "horizontal", scale: scaleOption } = chart

    const scale: Scale = {
      min: scaleOption?.min ?? suggestedScale.min,
      max: scaleOption?.max ?? suggestedScale.max,
      step: scaleOption?.step ?? suggestedScale.step,
    }

    const { min, max, step } = scale

    /* label 생성 */
    const valueLabels = Array.from(
      { length: Math.floor((max - min) / step) + 1 },
      (_, i) => `${step * i + min}`
    )
    const indexLabels = labels

    const [xLabels, yLabels] =
      direction === "horizontal"
        ? [valueLabels, indexLabels]
        : [indexLabels, valueLabels]

    return Align({
      alignment: Alignment.topCenter,
      child: Stack({
        children: [
          Container({
            child: IntrinsicHeight({
              child: IntrinsicWidth({
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
                      null,
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
            }),
          }),
          ...additions.map(({ position, Custom }) =>
            Positioned({ ...position, child: Custom() })
          ),
        ],
      }),
    })
  }
}

export default () => new Chart()
