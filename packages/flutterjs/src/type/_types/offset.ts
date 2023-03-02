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

  static of({x, y}:{x: number, y: number}) {
    return new Offset({x: x, y: y})
  }

  static zero() {
    return new Offset({ x: 0, y: 0 })
  }

  plus({ x, y }: Offset) {
    return new Offset({ x: this.x + x, y: this.y + y })
  }
}

export default Offset
