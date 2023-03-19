type OffsetProps = {
  x: number
  y: number
}

class Offset {
  x: number
  y: number
  constructor({ x, y }: OffsetProps) {
    this.x = x
    this.y = y
  }

  static raw({x, y}:{x: number, y: number}) {
    return new Offset({x: x, y: y})
  }

  static zero() {
    return Offset.raw({ x: 0, y: 0 })
  }

  plus({ x, y }: Offset) {
    return Offset.raw({ x: this.x + x, y: this.y + y })
  }
}

export default Offset