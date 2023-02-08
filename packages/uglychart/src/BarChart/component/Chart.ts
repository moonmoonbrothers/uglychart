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
import { CustomProvider, ThemeProvider } from "../provider"
import XAxis from "./XAxis"
import YAxis from "./YAxis"
import Plot from "./Plot"

class Chart extends ComponentWidget {
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context)
    const { chart, additions } = CustomProvider.of(context)
    if (chart.type === "custom") {
      return chart.Custom({ XAxis, YAxis, Plot }, { theme })
    }

    return Align({
      alignment: Alignment.topCenter,
      child: Stack({
        children: [
          Container({
            child: IntrinsicHeight({
              child: IntrinsicWidth({
                child: Grid({
                  childrenByRow: [
                    [YAxis(), Plot()],
                    [null, XAxis()],
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
