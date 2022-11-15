type EdgeInsetsProps = {
  top: number
  bottom: number
  left: number
  right: number
}
export default class EdgeInsets {
  top: number
  bottom: number
  left: number
  right: number

  static all(value: number) {
    return new EdgeInsets({
      top: value,
      bottom: value,
      left: value,
      right: value,
    })
  }

  static symmetric({
    horizontal = 0,
    vertical = 0,
  }: {
    horizontal?: number
    vertical?: number
  }) {
    return new EdgeInsets({
      top: vertical,
      bottom: vertical,
      left: horizontal,
      right: horizontal,
    })
  }

  static only({
    top = 0,
    bottom = 0,
    left = 0,
    right = 0,
  }: {
    top: number
    bottom: number
    left: number
    right: number
  }) {
    return new EdgeInsets({
      top,
      bottom,
      left,
      right,
    })
  }

  constructor({ top, bottom, left, right }: EdgeInsetsProps) {
    this.top = top
    this.bottom = bottom
    this.left = left
    this.right = right
  }
}
