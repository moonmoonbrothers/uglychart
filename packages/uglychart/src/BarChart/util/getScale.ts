const SNAP_VALUES = [1, 2, 5, 10]

type ValueEdge = {
  min: number
  max: number
}

export type Scale = {
  min: number
  max: number
  step: number
}

function getDigits(num: number): number {
  const logNumberDividedLN10 =
    num === 0 ? 1 : Math.log(Math.abs(num)) / Math.LN10

  return 10 ** Math.floor(logNumberDividedLN10)
}

function getSnappedNumber(num: number): number {
  let snapNumber = 0

  for (let i = 0, t = SNAP_VALUES.length; i < t; i += 1) {
    snapNumber = SNAP_VALUES[i]
    const guideValue = (snapNumber + (SNAP_VALUES[i + 1] || snapNumber)) / 2

    if (num <= guideValue) {
      break
    }
  }

  return snapNumber
}

function getNormalizedStep(stepSize: number) {
  const placeNumber = getDigits(stepSize)
  const simplifiedStepValue = stepSize / placeNumber

  return getSnappedNumber(simplifiedStepValue) * placeNumber
}

/**
 * Get normalized limit values
 * max = 155 and step = 10 ---> max = 160
 */
function getNormalizedLimit(limit: ValueEdge, stepSize: number): ValueEdge {
  let { min, max } = limit
  const minNumber = Math.min(getDigits(max), getDigits(stepSize))
  const placeNumber = minNumber > 1 ? 1 : 1 / minNumber
  const fixedStep = stepSize * placeNumber

  // ceil max value step digits
  max = (Math.ceil((max * placeNumber) / fixedStep) * fixedStep) / placeNumber

  if (min > stepSize) {
    // floor min value to multiples of step
    min =
      (Math.floor((min * placeNumber) / fixedStep) * fixedStep) / placeNumber
  } else if (min < 0) {
    min =
      -(Math.ceil((Math.abs(min) * placeNumber) / fixedStep) * fixedStep) /
      placeNumber
  } else {
    min = 0
  }

  return { min, max }
}

function getNormalizedStepCount(limitSize: number, stepSize: number) {
  const multiplier = 1 / Math.min(getDigits(limitSize), getDigits(stepSize))

  return Math.ceil((limitSize * multiplier) / (stepSize * multiplier))
}

// function hasStepSize(stepSize: number | "auto"): stepSize is number {
//   return typeof stepSize === "number"
// }

export function getScale(roughScaleDate: Scale): Scale {
  const step = getNormalizedStep(roughScaleDate.step)
  const edge = getNormalizedLimit(
    { min: roughScaleDate.min, max: roughScaleDate.max },
    step
  )

  return {
    min: edge.min,
    max: edge.max,
    step,
  }
}

export default getScale
