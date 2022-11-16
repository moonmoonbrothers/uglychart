import Offset from "./offset"
import type Size from "./size"

class Alignment {
  x: number // -1 ~ 1
  y: number // -1 ~ 1

  constructor({ x, y }: { x: number; y: number }) {
    this.x = x
    this.y = y
  }

  getOffset({ target, current }: { target: Size; current: Size }): Offset {
    return new Offset({
      x: ((1 + this.x) * (current.width - target.width)) / 2,
      y: ((1 + this.y) * (current.height - target.height)) / 2,
    })
  }

  static of({ x, y }: { x: number; y: number }) {
    return new Alignment({ x, y })
  }

  static topLeft = Alignment.of({ x: -1, y: -1 })
  static topCenter = Alignment.of({ x: 0, y: -1 })
  static topRight = Alignment.of({ x: 1, y: -1 })
  static centerLeft = Alignment.of({ x: -1, y: 0 })
  static center = Alignment.of({ x: 0, y: 0 })
  static centerRight = Alignment.of({ x: 1, y: 0 })
  static bottomLeft = Alignment.of({ x: -1, y: 1 })
  static bottomCenter = Alignment.of({ x: 0, y: 1 })
  static bottomRight = Alignment.of({ x: 1, y: 1 })
}

export default Alignment
