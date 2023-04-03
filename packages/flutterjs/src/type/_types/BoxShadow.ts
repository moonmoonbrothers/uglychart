class BoxShadow {
  color: string
  offset: {x: number, y: number}
  blurRadius: number
  // spreadRadius: number = 0
  // blurStyle = normal

  constructor({
    color = 'black',
    offset = {x: 0, y: 0},
    blurRadius = 0
  }: {color?: string, offset?: {x: number, y: number}, blurRadius?: number } = {}) {
    this.color = color;
    this.offset = offset
    this.blurRadius = blurRadius
  }
}

export default BoxShadow