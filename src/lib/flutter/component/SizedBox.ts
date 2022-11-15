import LimitedBox from "./base/LimitedBox"

export default function SizeBox({
  width = 0,
  height = 0,
}: {
  width?: number
  height?: number
}) {
  return new LimitedBox({ width, height })
}
