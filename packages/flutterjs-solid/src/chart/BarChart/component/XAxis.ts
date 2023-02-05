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
import { CustomProvider, DataProvider, ThemeProvider } from "../provider"
import XAxisLabel from "./XAxisLabel"

class XAxis extends ComponentWidget {
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context)
    const data = DataProvider.of(context)
    const { xAxis, plot } = CustomProvider.of(context)

    if (xAxis.type === "custom") {
      return xAxis.Custom({ XAxisLabel }, { theme, data })
    }

    const { axis } = xAxis

    const { labels, datasets } = data

    if (axis === "data") {
      const { value } = xAxis
    } else {
    }

    // 일단 horizontal로 가정하고..

    const xLabels = Array.from({ length: 11 }, (_, i) => 10 * i)

    return Column({
      children: [
        Row({
          mainAxisAlignment: "spaceBetween",
          crossAxisAlignment: "end",
          children: xLabels.map((label, index) =>
            IntrinsicHeight({
              child: Column({
                children: [
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
