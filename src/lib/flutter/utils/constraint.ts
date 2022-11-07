import Size from "./size"

type ConstraintProps = {
  minWidth: number
  maxWidth: number
  minHeight: number
  maxHeight: number
}

class Constraint {
  minWidth: number
  maxWidth: number
  minHeight: number
  maxHeight: number

  constructor({ maxHeight, maxWidth, minHeight, minWidth }: ConstraintProps) {
    this.minWidth = minWidth
    this.maxWidth = maxWidth
    this.minHeight = minHeight
    this.maxHeight = maxHeight
  }

  constrain({ width, height }: Size): Size {
    return new Size({
      width: this.clampWidth(width),
      height: this.clampHeight(height),
    })
  }

  private clampWidth(width: number) {
    return Math.min(this.maxWidth, Math.max(this.minWidth, width))
  }

  private clampHeight(hegiht: number) {
    return Math.min(this.maxHeight, Math.max(this.minHeight, hegiht))
  }
}

export default Constraint
