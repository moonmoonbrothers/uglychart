import Widget from "../widget/Widget"
import BaseIntrinsicWidth from "./base/BaseIntrinsicWidth"

export default function IntrinsicWidth({ child }: { child?: Widget }) {
  return new BaseIntrinsicWidth({ child })
}
