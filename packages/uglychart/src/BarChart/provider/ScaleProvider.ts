import { Provider, Widget } from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import type { Scale } from "../../util/getScale"

const KEY = Symbol("SCALE")
const ScaleProvider = ({ child, scale }: { child: Widget; scale: Scale }) =>
  Provider({
    providerKey: KEY,
    child,
    value: scale,
  })

ScaleProvider.of = (context: BuildContext) => Provider.of<Scale>(KEY, context)

export default ScaleProvider
