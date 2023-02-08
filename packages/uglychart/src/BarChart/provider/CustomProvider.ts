import { Provider, Widget } from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { Custom, BarChartType } from "../types"

const KEY = Symbol("THEME")
const CustomProvider = <TYPE extends BarChartType>({
  child,
  custom,
}: {
  child: Widget
  custom: Required<Custom<TYPE>>
}) =>
  Provider({
    providerKey: KEY,
    child,
    value: custom,
  })

CustomProvider.of = <TYPE extends BarChartType>(context: BuildContext) =>
  Provider.of<Required<Custom<TYPE>>>(KEY, context)

export default CustomProvider
