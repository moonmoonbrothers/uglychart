type Offset = {x: number, y: number};

export class Rect {
  private constructor(
    public left: number,
    public top: number,
    public right: number,
    public bottom: number
  ) {}

  get width() {
    return this.right - this.left
  }

  get height() {
    return this.bottom - this.top
  }

  static fromLTRB({
    left,
    top,
    right,
    bottom,
  }: {
    left: number
    top: number
    right: number
    bottom: number
  }) {
    return new Rect(left, top, right, bottom)
  }

  static fromLTWH({
    left,
    top,
    width,
    height,
  }: {
    left: number
    top: number
    width: number
    height: number
  }) {
    return Rect.fromLTRB({
      left,
      top,
      right: left + width,
      bottom: top + height,
    })
  }

  static fromCircle({ center, radius }: { center: Offset; radius: number }) {
    return Rect.fromCenter({ center, width: 2 * radius, height: 2 * radius })
  }

  static fromCenter({
    center,
    width,
    height,
  }: {
    center: Offset
    width: number
    height: number
  }) {
    return Rect.fromLTRB({
      left: center.x - width / 2,
      top: center.y - height / 2,
      right: center.x + width / 2,
      bottom: center.y + height / 2,
    })
  }

  static fromPoints(a: Offset, b: Offset) {
    return Rect.fromLTRB({
      left: Math.min(a.x, b.x),
      top: Math.min(a.y, b.y),
      right: Math.max(a.x, b.x),
      bottom: Math.max(a.y, b.y),
    })
  }
}

export default Rect

