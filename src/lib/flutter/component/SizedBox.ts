import Container from "./base/Container"

export default function SizeBox({
  width = 0,
  height = 0,
}: {
  width?: number
  height?: number
}) {
  return new Container({ width, height })
}
