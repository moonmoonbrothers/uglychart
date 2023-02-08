import { Provider, Widget } from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { Custom, BarChartType } from "../types"

const KEY = Symbol("THEME")
const CustomProvider = ({ child, custom }: { child: Widget; custom: Custom }) =>
  Provider({
    providerKey: KEY,
    child,
    value: custom,
  })

CustomProvider.of = <TYPE extends BarChartType>(context: BuildContext) =>
  Provider.of<Required<Custom>>(KEY, context)

export default CustomProvider
