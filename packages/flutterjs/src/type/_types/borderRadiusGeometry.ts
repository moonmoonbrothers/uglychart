class BorderRadiusGeometry {
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
    return new BorderRadiusGeometry({
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
    return new BorderRadiusGeometry({
      topLeft,
      topRight,
      bottomLeft,
      bttomRight,
    })
  }
}


export default BorderRadiusGeometry
