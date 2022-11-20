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

  static loose(size: { width: number; height: number }) {
    return new Constraint({
      minHeight: 0,
      maxHeight: size.height,
      minWidth: 0,
      maxWidth: size.width,
    })
  }

  static tight({ width, height }: { width: number; height: number }) {
    return new Constraint({
      maxHeight: height,
      minHeight: height,
      maxWidth: width,
      minWidth: width,
    })
  }

  static tightOnly({ width, height }: { width?: number; height?: number }) {
    return new Constraint({
      maxHeight: height ?? Infinity,
      minHeight: height ?? 0,
      maxWidth: width ?? Infinity,
      minWidth: width ?? 0,
    })
  }

  /*
    depricated!!
    because method name is similar to constrain. it can be confusing
    instead use enforce!!
  */
  restrict(child: Constraint): Constraint {
    console.log("deprecated restric mehtod in constraint.ts")
    return new Constraint({
      maxHeight: Math.min(this.maxHeight, child.maxHeight),
      minHeight: Math.max(this.minHeight, child.minHeight),
      maxWidth: Math.min(this.maxWidth, child.maxWidth),
      minWidth: Math.max(this.minWidth, child.minWidth),
    })
  }

  enforce(parent: Constraint): Constraint {
    return new Constraint({
      minWidth: parent.clampWidth(this.minWidth),
      maxWidth: parent.clampWidth(this.maxWidth),
      minHeight: parent.clampHeight(this.minHeight),
      maxHeight: parent.clampHeight(this.maxHeight),
    })
  }

  loosen(): Constraint {
    return new Constraint({
      ...this,
      minHeight: 0,
      minWidth: 0,
    })
  }

  constrain({ width, height }: Size): Size {
    return new Size({
      width: this.clampWidth(width),
      height: this.clampHeight(height),
    })
  }

  normalize(): Constraint {
    return new Constraint({
      ...this,
      minHeight: Math.min(this.minHeight, this.maxHeight),
      minWidth: Math.min(this.minWidth, this.maxWidth),
    })
  }

  getMax(key: "width" | "height"): number {
    return key === "width" ? this.maxWidth : this.maxHeight
  }

  getMin(key: "width" | "height"): number {
    return key === "width" ? this.minWidth : this.minHeight
  }

  get hasTightWidth(): boolean {
    return this.maxWidth === this.minWidth
  }

  get hasTightHeight(): boolean {
    return this.maxHeight === this.minHeight
  }

  get isTight(): boolean {
    return this.hasTightWidth && this.hasBoundedHeight
  }

  get hasBoundedWidth(): boolean {
    return this.maxWidth !== Infinity
  }

  get hasBoundedHeight(): boolean {
    return this.maxHeight !== Infinity
  }

  get isUnbounded(): boolean {
    return this.hasBoundedHeight && this.hasBoundedWidth
  }

  private clampWidth(width: number) {
    return Math.min(this.maxWidth, Math.max(this.minWidth, width))
  }

  private clampHeight(hegiht: number) {
    return Math.min(this.maxHeight, Math.max(this.minHeight, hegiht))
  }
}

export default Constraint
