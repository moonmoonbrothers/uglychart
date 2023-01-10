import type Widget from "../widget/Widget"
import ProviderWidget from "./ProviderWidget"

export type ProviderProps<ProviderKey, Value> = {
  providerKey: ProviderKey
  value: Value
  child: Widget
}

function Provider<ProviderKey, Value>(
  props: ProviderProps<ProviderKey, Value>
) {
  return new ProviderWidget(props)
}

Provider.of = ProviderWidget.of

export default Provider
