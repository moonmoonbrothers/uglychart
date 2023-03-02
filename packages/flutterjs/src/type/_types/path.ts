export class Path {
  private path: string

  lineTo({ x, y }: Offset) {
    this.path += `L${x} ${y}`
    return this
  }

  moveTo({ x, y }: Offset) {
    this.path += `M${x} ${y}`
    return this
  }

  quadraticBezierTo({
    controlPoint,
    endPoint,
  }: {
    controlPoint: Offset
    endPoint: Offset
  }) {
    this.path += `Q ${controlPoint.x} ${controlPoint.y} ${endPoint.x} ${endPoint.y}`
    return this
  }

  cubicTo({
    startControlPoint,
    endControlPoint,
    endPoint,
  }: {
    endControlPoint: Offset
    startControlPoint: Offset
    endPoint: Offset
  }) {
    this.path += `C ${startControlPoint.x} ${startControlPoint.y} ${endControlPoint.x} ${endControlPoint.y} ${endPoint.x} ${endPoint.y}`
    return this
  }

  arcToPoint({
    endPoint,
    radius,
    rotation,
    largeArc,
    clockwise,
  }: {
    endPoint: Offset
    rx: number
    ry: number
    rotation: number
    radius: Radius
    largeArc: boolean
    clockwise: boolean
  }) {
    this.path += `A ${radius.x} ${radius.y} ${rotation} ${largeArc ? 1 : 0} ${
      clockwise ? 1 : 0
    } ${endPoint.x} ${endPoint.y}`
    return this
  }

  addRect(rect: Rect) {
    return this
  }

  addRRect(rect: Rect, radius: Radius) {
    return this
  }

  addOval(rect: Rect) {
    return this
  }

  addPolygons(points: Offset[]) {
    return this
  }

  close() {
    return this
  }
}

type Offset = { x: number; y: number }
type Rect = {
  left: number
  top: number
  right: number
  bottom: number
}
type Radius = {
  x: number
  y: number
}
