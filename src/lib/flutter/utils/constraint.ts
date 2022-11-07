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

  static zero() {
    return new Constraint({
      minHeight: 0,
      maxHeight: 0,
      minWidth: 0,
      maxWidth: 0,
    })
  }

  static loose(size: Size) {
    return new Constraint({
      minHeight: 0,
      maxHeight: size.height,
      minWidth: 0,
      maxWidth: size.width,
    })
  }

  static tight({width, height}: Size) {
    return new Constraint({
      maxHeight: height,
      minHeight: height,
      maxWidth: width,
      minWidth: width
    })
  }

  constrain({ width, height }: Size): Size {
    return new Size({
      width: this.clampWidth(width),
      height: this.clampHeight(height),
    })
  }

  get isTight(): boolean {
    return this.maxHeight === this.minHeight && this.maxWidth === this.minWidth
  }

  private clampWidth(width: number) {
    return Math.min(this.maxWidth, Math.max(this.minWidth, width))
  }

  private clampHeight(hegiht: number) {
    return Math.min(this.maxHeight, Math.max(this.minHeight, hegiht))
  }
}

export default Constraint
