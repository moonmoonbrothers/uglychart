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
  IntrinsicHeight,
} from "@moonmoonbrothers/flutterjs"
import SizeBox from "@moonmoonbrothers/flutterjs/src/component/SizedBox"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { CustomProvider, DataProvider, ThemeProvider } from "../provider"
import YAxisLabel from "./YAxisLabel"

export type YAxisProps = {
  type: "index" | "value"
  labels: string[]
}

class YAxis extends ComponentWidget {
  constructor(private props: YAxisProps) {
    super()
  }

  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context)
    const data = DataProvider.of(context)
    const { yAxis } = CustomProvider.of(context)

    if (yAxis.type === "custom") {
      return yAxis.Custom({ YAxisLabel }, { theme, data })
    }

    if (this.props.type === "value") {
      return Row({
        children: [
          Padding({
            child: Column({
              mainAxisAlignment: "spaceBetween",
              crossAxisAlignment: "end",
              children: [
                ...this.props.labels.map((label, index) =>
                  IntrinsicWidth({
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
                  })
                ),
              ],
            }),
          }),
        ],
      })
    } else {
      return Row({
        mainAxisAlignment: "spaceBetween",
        children: [
          Padding({
            padding: EdgeInsets.symmetric({ vertical: 2 }),
            child: Column({
              children: [
                ...this.props.labels.map((label, index) =>
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
              ],
            }),
          }),
        ],
      })
    }
  }
}

export default (props: YAxisProps) => new YAxis(props)
