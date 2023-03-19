import Widget from "../widget/Widget"
import BaseIntrinsicHeight from "./base/BaseIntrinsicHeight"

export default function IntrinsicHeight({ child }: { child?: Widget }) {
  return new BaseIntrinsicHeight({ child })
}
