import Container from "./base/Container"
import FlexItem from "./base/FlexItem"

export default function Expanded({ flex = 1 }: { flex?: number }) {
  return new FlexItem({
    flex,
    child: new Container({
      width: Infinity,
      height: Infinity,
    }),
  })
}
