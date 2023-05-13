/** 서로다른 길이의 value가 올수도 있음. */
export function getValueEdge(valuesByLegend: number[][]) {
  let min: number = Infinity
  let max: number = -Infinity
  valuesByLegend.forEach((values) => {
    values.forEach((value) => {
      min = Math.min(value, min)
      max = Math.max(value, max)
    })
  })

  return {
    min,
    max,
  }
}
