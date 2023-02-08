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

export type XAxisProps = {
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

    return Column({
      children: [
        Row({
          mainAxisAlignment: "spaceBetween",
          crossAxisAlignment: "end",
          children: this.props.labels.map((label, index) =>
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

export default (props: XAxisProps) => new XAxis(props)
