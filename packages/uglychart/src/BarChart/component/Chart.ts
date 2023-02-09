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
import {
  CustomProvider,
  DataProvider,
  ScaleProvider,
  ThemeProvider,
} from "../provider"
import XAxis from "./XAxis"
import YAxis from "./YAxis"
import Plot from "./Plot"

class Chart extends ComponentWidget {
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context)
    const { labels } = DataProvider.of(context)
    const { chart, additions } = CustomProvider.of(context)
    if (chart.type === "custom") {
      return chart.Custom({ XAxis, YAxis, Plot }, { theme })
    }

    const scale = ScaleProvider.of(context)
    const { step, min, max } = scale

    const valueLabels = Array.from(
      { length: Math.floor((max - min) / step) + 1 },
      (_, i) => `${step * i + min}`
    )
    const indexLabels = labels

    const { direction = "horizontal" } = chart

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
                      Plot({ direction }),
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
