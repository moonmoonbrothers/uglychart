import type Rect from "./Rect"
import { RRect } from "./rRect"

export class Path {
  private path: string

  private _moveTo({ x, y }: Offset, relative: boolean) {
    this.path += `${relative ? "m" : "M"}${x} ${y}`
    return this
  }

  moveTo(point: Offset) {
    return this._moveTo(point, false)
  }

  relativeMoveTo(point: Offset) {
    return this._moveTo(point, true)
  }

  private _lineTo({ x, y }: Offset, relative: boolean) {
    this.path += `${relative ? "l" : "L"}${x} ${y}`
    return this
  }

  lintTo(point: Offset) {
    return this._lineTo(point, false)
  }

  relativeLintTo(point: Offset) {
    return this._lineTo(point, true)
  }

  quadraticBezierTo(props: { controlPoint: Offset; endPoint: Offset }) {
    return this._quadraticBezierTo(props, false)
  }

  relativeQuadraticBezierTo(props: { controlPoint: Offset; endPoint: Offset }) {
    return this._quadraticBezierTo(props, true)
  }

  private _quadraticBezierTo(
    {
      controlPoint,
      endPoint,
    }: {
      controlPoint: Offset
      endPoint: Offset
    },
    relative: boolean
  ) {
    this.path += `${relative ? "q" : "Q"}${controlPoint.x} ${controlPoint.y} ${
      endPoint.x
    } ${endPoint.y}`
    return this
  }

  private _cubicTo(
    {
      startControlPoint,
      endControlPoint,
      endPoint,
    }: {
      endControlPoint: Offset
      startControlPoint: Offset
      endPoint: Offset
    },
    relative: boolean
  ) {
    this.path += `${relative ? "c" : "C"}${startControlPoint.x} ${
      startControlPoint.y
    } ${endControlPoint.x} ${endControlPoint.y} ${endPoint.x} ${endPoint.y}`
    return this
  }

  cubicTo(props: {
    endControlPoint: Offset
    startControlPoint: Offset
    endPoint: Offset
  }) {
    return this._cubicTo(props, false)
  }

  relativeCubicTo(props: {
    endControlPoint: Offset
    startControlPoint: Offset
    endPoint: Offset
  }) {
    return this._cubicTo(props, true)
  }

  _arcToPoint(
    {
      endPoint,
      radius,
      rotation,
      largeArc,
      clockwise,
    }: {
      endPoint: Offset
      rotation: number
      radius: Radius
      largeArc: boolean
      clockwise: boolean
    },
    relative: boolean
  ) {
    this.path += `${relative ? "a" : "A"}${radius.x} ${radius.y} ${rotation} ${
      largeArc ? 1 : 0
    } ${clockwise ? 1 : 0} ${endPoint.x} ${endPoint.y}`
    return this
  }

  arcToPoint(props: {
    endPoint: Offset
    rotation: number
    radius: Radius
    largeArc: boolean
    clockwise: boolean
  }) {
    return this._arcToPoint(props, false)
  }

  relativeArcToPoint(props: {
    endPoint: Offset
    rotation: number
    radius: Radius
    largeArc: boolean
    clockwise: boolean
  }) {
    return this._arcToPoint(props, true)
  }

  addRect(rect: Rect) {
    return this.moveTo({ x: rect.left, y: rect.top })
      .lintTo({ x: rect.right, y: rect.top })
      .lintTo({ x: rect.right, y: rect.bottom })
      .lintTo({ x: rect.left, y: rect.bottom })
      .close()
  }

  addRRect(rect: RRect) {
    throw new Error('addRRect is not implemented')
  }

  addOval(rect: Rect) {
    const common = {
      rotation: 0,
      radius: { x: rect.width / 2, y: rect.height / 2 },
      largeArc: false,
      clockwise: true,
    }
    const point1 = { x: rect.left, y: rect.height / 2 }
    const point2 = { x: rect.right, y: rect.height / 2 }

    return this.moveTo(point1)
      .arcToPoint({
        ...common,
        endPoint: point2,
      })
      .arcToPoint({
        ...common,
        endPoint: point1,
      })
      .close()
  }

  addPolygons(points: Offset[]) {
    if (points.length < 3) throw Error("polygons need at least 3 points")

    this.moveTo(points[0])
    points.slice(1).forEach((point) => this.lintTo(point))
    return this.close()
  }

  close() {
    this.path += "Z"
    return this
  }
}

type Offset = { x: number; y: number }

type Radius = {
  x: number
  y: number
}
