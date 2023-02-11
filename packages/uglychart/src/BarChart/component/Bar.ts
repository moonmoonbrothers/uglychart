import {
  Column,
  ComponentWidget,
  Container,
  EdgeInsets,
  Expanded,
  Flexible,
  Positioned,
  Row,
  Stack,
  Text,
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

    const { thickness = 2 } = bar

    const BarWrapper = ({ children }: { children: Widget[] }) =>
      direction === "horizontal" ? Row({ children }) : Column({ children })

    const DataLabel = () =>
      direction === "horizontal"
        ? Positioned({
            child: Container({
              width: 0,
              height: 0,
              child: Text("22", { textBaseline: "central" }),
            }),
            top: thickness / 2,
            right: -5,
          })
        : Positioned({
            child: Container({
              height: 0,
              width: 0,
              child: Text("10", {
                textAlign: "middle",
                textBaseline: "bottom",
              }),
            }),
            left: thickness / 2,
            top: -5,
          })

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
            DataLabel(),
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
