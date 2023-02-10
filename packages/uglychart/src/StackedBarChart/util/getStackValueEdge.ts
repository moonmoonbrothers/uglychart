/**
 * 서로다른 길이의 value가 올수도 있음.
 * 일단은 같다고 전제
 * */
export function getStackValueEdge(valuesByLegend: number[][]) {
  let min: number = Infinity
  let max: number = -Infinity

  const maxValueLength = valuesByLegend[0].length

  for (let i = 0; i < maxValueLength; i++) {
    let positiveSum = 0
    let negativeSum = 0
    for (let j = 0; j < valuesByLegend.length; j++) {
      const value = valuesByLegend[j][i] ?? 0
      if (value > 0) {
        positiveSum += value
      } else {
        negativeSum += value
      }
    }

    min = Math.min(min, negativeSum)
    max = Math.max(max, positiveSum)
  }

  return {
    min,
    max,
  }
}
