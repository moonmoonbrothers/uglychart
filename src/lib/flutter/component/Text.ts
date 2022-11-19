import _Text, { type TextProps } from "./base/Text"

export default function Text(text: string, props: TextProps = {}) {
  return new _Text(text, props)
}
