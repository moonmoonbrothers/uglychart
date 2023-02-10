import { BarChartProps } from "./types"
import BaseBarChart from "./BaseBarChart"

export function BarChart({
  type = "series",
  ...props
}: BarChartProps & { type?: "series" | "stack" | "diverging" }) {
  return BaseBarChart({
    ...props,
    custom: {
      ...props.custom,
    },
  })
}

export default BarChart


