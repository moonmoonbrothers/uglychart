type RRectProps = {
  top: number
  left: number
  bottom: number
  right: number
  tlRadiusX: number
  tlRadiusY: number
  blRadiusX: number
  blRadiusY: number
  trRadiusX: number
  trRadiusY: number
  brRadiusX: number
  brRadiusY: number
}
export class RRect {
  private constructor(
    public top: number,
    public left: number,
    public bottom: number,
    public right: number,
    public tlRadiusX: number,
    public tlRadiusY: number,
    public blRadiusX: number,
    public blRadiusY: number,
    public trRadiusX: number,
    public trRadiusY: number,
    public brRadiusX: number,
    public brRadiusY: number
  ) {}

  static raw({
    top,
    left,
    bottom,
    right,
    tlRadiusX,
    tlRadiusY,
    blRadiusX,
    blRadiusY,
    trRadiusX,
    trRadiusY,
    brRadiusX,
    brRadiusY,
  }: RRectProps) {
    return new RRect(
      top,
      left,
      bottom,
      right,
      tlRadiusX,
      tlRadiusY,
      blRadiusX,
      blRadiusY,
      trRadiusX,
      trRadiusY,
      brRadiusX,
      brRadiusY
    )
  }
}
