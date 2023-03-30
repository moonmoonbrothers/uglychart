import Radius from "./Radius";
import BorderRadiusGeometry from "./BorderRadiusGeometry";

export default class BorderRadius extends BorderRadiusGeometry {
  static all(radius: Radius) {
    return this.only({
      topLeft: radius,
      topRight: radius,
      bottomLeft: radius,
      bottomRight: radius,
    });
  }

  static circular(radius: number) {
    return this.all(Radius.circular(radius));
  }

  static vertical({
    top = Radius.zero,
    bottom = Radius.zero,
  }: {
    top?: Radius;
    bottom?: Radius;
  }) {
    return this.only({
      topLeft: top,
      topRight: top,
      bottomLeft: bottom,
      bottomRight: bottom,
    });
  }

  static left({
    left = Radius.zero,
    right= Radius.zero,
  }: {
    left?: Radius;
    right?: Radius;
  }) {
    return this.only({
      topLeft: left,
      bottomLeft: left,
      topRight: right,
      bottomRight: right,
    });
  }

  static only({
    topLeft = Radius.zero,
    topRight = Radius.zero,
    bottomLeft = Radius.zero,
    bottomRight = Radius.zero,
  }: {
    topLeft?: Radius;
    topRight?: Radius;
    bottomLeft?: Radius;
    bottomRight?: Radius;
  }) {
    return new BorderRadius({
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
    });
  }

  copyWith({
    topLeft = this.topLeft,
    topRight = this.topRight,
    bottomLeft = this.bottomLeft,
    bottomRight = this.bottomRight
  }: {
    topLeft?: Radius;
    topRight?: Radius;
    bottomLeft?: Radius;
    bottomRight?: Radius;
  }) {
    return BorderRadius.only({
      topLeft,
      topRight,
      bottomLeft,
      bottomRight
    })
  }

  static zero() {
    return this.all(Radius.zero)
  }
}
