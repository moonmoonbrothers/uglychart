import {
  Align,
  Alignment,
  Column,
  ComponentWidget,
  Container,
  Flexible,
  IntrinsicHeight,
  Row,
  Widget,
} from "@moonmoonbrothers/flutterjs"
import SizeBox from "@moonmoonbrothers/flutterjs/src/component/SizedBox"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { CustomProvider, DataProvider, ThemeProvider } from "../provider"
import XAxisLabel from "./XAxisLabel"

export type XAxisProps = {
  type: "index" | "value"
  labels: string[]
}

class XAxis extends ComponentWidget {
  constructor(private props: XAxisProps) {
    super()
  }

  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context)
    const data = DataProvider.of(context)
    const { xAxis } = CustomProvider.of(context)

    if (xAxis.type === "custom") {
      return xAxis.Custom({ XAxisLabel }, { theme, data })
    }

    if (this.props.type === "index") {
      return Column({
        children: [
          Row({
            mainAxisAlignment: "spaceBetween",
            crossAxisAlignment: "end",
            children: [
              Flexible({ flex: 0.5 }),
              ...this.props.labels.map((label, index) =>
                Flexible({
                  child: Align({
                    alignment: Alignment.topCenter,
                    child: IntrinsicHeight({
                      child: Column({
                        children: [
                          /* tick */
                          Container({
                            width: 2,
                            height: 10,
                            color: "black",
                          }),
                          XAxisLabel({ text: `${label}`, index }),
                        ],
                      }),
                    }),
                  }),
                })
              ),
              Flexible({ flex: 0.5 }),
            ],
          }),
        ],
      })
    } else {
      return Column({
        children: [
          Row({
            mainAxisAlignment: "spaceBetween",
            crossAxisAlignment: "end",
            children: [
              ...this.props.labels.map((label, index) =>
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
                      SizeBox({ width: 2 }), //이건 뭐지??
                    ],
                  }),
                })
              ),
            ],
          }),
        ],
      })
    }
  }
}

export default (props: XAxisProps) => new XAxis(props)
