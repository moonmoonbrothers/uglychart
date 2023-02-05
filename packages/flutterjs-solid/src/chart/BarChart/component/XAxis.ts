import {
  Column,
  ComponentWidget,
  Container,
  IntrinsicHeight,
  Row,
  Widget,
} from "@moonmoonbrothers/flutterjs"
import SizeBox from "@moonmoonbrothers/flutterjs/src/component/SizedBox"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import {
  CustomProvider,
  DataProvider,
  ScaleProvider,
  ThemeProvider,
} from "../provider"
import XAxisLabel from "./XAxisLabel"

class XAxis extends ComponentWidget {
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context)
    const data = DataProvider.of(context)
    const scale = ScaleProvider.of(context)
    const { xAxis, plot } = CustomProvider.of(context)

    if (xAxis.type === "custom") {
      return xAxis.Custom({ XAxisLabel }, { theme, data })
    }

    const { axis } = xAxis

    let xLabels: string[]

    if (axis === "data") {
      const {} = xAxis
      const { step, min, max } = scale
      console.log(max)
      xLabels = Array.from(
        { length: Math.floor((max - min) / step) + 1 },
        (_, i) => `${step * i + min}`
      )
    } else {
      xLabels = []
    }

    return Column({
      children: [
        Row({
          mainAxisAlignment: "spaceBetween",
          crossAxisAlignment: "end",
          children: xLabels.map((label, index) =>
            IntrinsicHeight({
              child: Column({
                children: [
                  /* tick */
                  Container({
                    width: 2,
                    height: 10,
                    color: "black",
                  }),
                  XAxisLabel({ text: `${label}`, index }),
                  SizeBox({ width: 2 }),
                ],
              }),
            })
          ),
        }),
      ],
    })
  }
}

export default () => new XAxis()
