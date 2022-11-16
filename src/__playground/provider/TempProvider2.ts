import Provider from "$lib/flutter/provider"
import type { BuildContext } from "$lib/flutter/widget/ComponentWidget"
import type Widget from "$lib/flutter/widget/Widget"

const KEY = Symbol("TEMP")

type Value = {
  temp: string
}

function TempProvider2(props: { child: Widget; value: Value }) {
  return Provider({ ...props, providerKey: KEY })
}

TempProvider2.of = (context: BuildContext) => {
  return Provider.of<Value>(KEY, context)
}

export default TempProvider2
