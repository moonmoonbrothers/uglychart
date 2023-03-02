export class Radius {
  constructor(public x: number, public y: number) {}

  static circular(r: number) {
    return Radius.elliptical({ x: r, y: r })
  }
  static elliptical({ x, y }: { x: number; y: number }) {
    return new Radius(x, y)
  }
}

export default Radius
