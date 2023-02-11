import {
  Column,
  ComponentWidget,
  Container,
  EdgeInsets,
  Expanded,
  Flexible,
  Row,
  Stack,
  Widget,
} from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import {
  CustomProvider as CustomProvider,
  DataProvider,
  ThemeProvider,
} from "../provider"
import { Utils } from "../../utils"
import SizeBox from "@moonmoonbrothers/flutterjs/src/component/SizedBox"

export type BarProps = {
  backgroundColor: string
  index: number
  ratio: number
  reverse?: boolean
  label: string
  legend: string
  direction: "horizontal" | "vertical"
}
export class Bar extends ComponentWidget {
  constructor(private props: BarProps) {
    super()
  }

  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context)
    const data = DataProvider.of(context)
    const { bar } = CustomProvider.of(context)

    const {
      backgroundColor: color,
      index,
      label,
      ratio,
      legend,
      direction,
      reverse,
    } = this.props

    if (bar.type === "custom") {
      return bar.Custom(
        {},
        {
          color,
          index,
          ratio,
          theme,
          label,
          legend,
          data,
        }
      )
    }

    const { thickness } = bar

    const BarWrapper = ({ children }: { children: Widget[] }) =>
      direction === "horizontal" ? Row({ children }) : Column({ children })

    const Bar = () =>
      Flexible({
        flex: ratio,
        child: Stack({
          children: [
            Container({
              color,
              ...(direction === "horizontal"
                ? { height: thickness }
                : { width: thickness }),
            }),
          ],
        }),
      })

    const Vacant = () => Expanded({ flex: 1 - ratio })

    return BarWrapper({
      children:
        (direction === "horizontal" && !reverse) ||
        (direction === "vertical" && reverse)
          ? [Bar(), Vacant()]
          : [Vacant(), Bar()],
    })
  }
}

export default (props: BarProps) => new Bar(props)
