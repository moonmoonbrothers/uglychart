import { BarChartProps } from "./types"
import BaseBarChart from "./BaseBarChart"

export function BarChart({
  type,
  ...props
}: BarChartProps & { type: "series" | "stack" | "diverging" }) {
  return BaseBarChart({
    ...props,
    custom: {
      ...props.custom,
    },
  })
}
