import { Provider, Widget } from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { Data } from "../types"

const KEY = Symbol("DATA")
const DataProvider = ({ child, data }: { child: Widget; data: Data }) =>
  Provider({
    providerKey: KEY,
    child,
    value: data,
  })

DataProvider.of = (context: BuildContext) => Provider.of<Data>(KEY, context)

export default DataProvider