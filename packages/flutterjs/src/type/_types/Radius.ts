import Utils from "../../utils";

export class Radius {
  constructor(public x: number, public y: number) {}
  static circular(r: number) {
    return Radius.elliptical({ x: r, y: r });
  }
  static elliptical({ x, y }: { x: number; y: number }) {
    return new Radius(x, y);
  }
  static zero = Radius.circular(0);

  clamp({ minimum, maximum }: { minimum?: Radius; maximum?: Radius }) {
    minimum ??= Radius.circular(-Infinity);
    maximum ??= Radius.circular(Infinity);
    return Radius.elliptical({
      x: Utils.clampDouble(this.x, minimum.x, maximum.x),
      y: Utils.clampDouble(this.y, minimum.y, maximum.y),
    });
  }

  clampValues({
    maximumX = Infinity,
    maximumY = Infinity,
    minimumX = -Infinity,
    minimumY = -Infinity,
  }: {
    minimumX?: number;
    minimumY?: number;
    maximumX?: number;
    maximumY?: number;
  }) {
    return Radius.elliptical({
      x: Utils.clampDouble(this.x, minimumX, maximumX),
      y: Utils.clampDouble(this.y, minimumY, maximumY),
    });
  }
}

export default Radius;
