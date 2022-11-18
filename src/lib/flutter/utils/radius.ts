class Radius {
  topLeft: number
  topRight: number
  bottomLeft: number
  bottomRight: number

  constructor({
    topLeft,
    topRight,
    bottomLeft,
    bttomRight,
  }: {
    topLeft: number
    topRight: number
    bottomLeft: number
    bttomRight: number
  }) {
    this.bottomLeft = bottomLeft
    this.bottomRight = bttomRight
    this.topLeft = topLeft
    this.topRight = topRight
  }

  static all(value: number) {
    return new Radius({
      topLeft: value,
      topRight: value,
      bottomLeft: value,
      bttomRight: value,
    })
  }

  static only({
    topLeft = 0,
    topRight = 0,
    bottomLeft = 0,
    bttomRight = 0,
  }: {
    topLeft?: number
    topRight?: number
    bottomLeft?: number
    bttomRight?: number
  }) {
    return new Radius({
      topLeft,
      topRight,
      bottomLeft,
      bttomRight,
    })
  }
}

export default Radius
