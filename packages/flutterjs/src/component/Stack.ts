import type Widget from "../widget/Widget"
import BaseStack from "./base/BaseStack"

export default function Stack(props: { children: Widget[] }) {
  return new BaseStack(props)
}
