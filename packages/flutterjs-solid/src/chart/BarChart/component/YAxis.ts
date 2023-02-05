import {
  Column,
  ComponentWidget,
  Container,
  Flexible,
  IntrinsicWidth,
  Row,
  Text,
  Align,
  Widget,
  Alignment,
  Padding,
  EdgeInsets,
} from "@moonmoonbrothers/flutterjs"
import SizeBox from "@moonmoonbrothers/flutterjs/src/component/SizedBox"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { CustomProvider, DataProvider, ThemeProvider } from "../provider"
import YAxisLabel from "./YAxisLabel"

class YAxis extends ComponentWidget {
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context)
    const data = DataProvider.of(context)
    const { yAxis } = CustomProvider.of(context)

    if (yAxis.type === "custom") {
      return yAxis.Custom({ YAxisLabel }, { theme, data })
    }

    const { axis } = yAxis
    const horizontal = axis === "data"
    const { labels } = data

    return Row({
      children: [
        Padding({
          padding: EdgeInsets.symmetric({ vertical: 2 }),
          child: Column({
            children: [
              Flexible({ flex: 0.5 }),
              ...labels.map((label, index) =>
                Flexible({
                  child: Align({
                    alignment: Alignment.centerRight,
                    child: IntrinsicWidth({
                      child: Row({
                        children: [
                          YAxisLabel({ text: label, index }),
                          SizeBox({ width: 2 }),
                          Container({
                            width: 10,
                            height: 2,
                            color: "black",
                          }),
                        ],
                      }),
                    }),
                  }),
                })
              ),
              Flexible({ flex: 0.5 }),
            ],
          }),
        }),
      ],
    })
  }
}

export default () => new YAxis()
