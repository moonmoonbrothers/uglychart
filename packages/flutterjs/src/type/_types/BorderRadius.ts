import Radius from "./Radius";
import RRect from "./RRect";
import Rect from "./Rect";

export class BorderRadiusGeometry {
  topLeft: Radius;
  topRight: Radius;
  bottomLeft: Radius;
  bottomRight: Radius;

  constructor({
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  }: {
    topLeft: Radius;
    topRight: Radius;
    bottomLeft: Radius;
    bottomRight: Radius;
  }) {
    this.bottomLeft = bottomLeft;
    this.bottomRight = bottomRight;
    this.topLeft = topLeft;
    this.topRight = topRight;
  }

  toRRect(rect: Rect): RRect {
    throw new Error("Not implemented")
  }
}

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
    right = Radius.zero,
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
    bottomRight = this.bottomRight,
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
      bottomRight,
    });
  }

  static zero = this.all(Radius.zero);

  toRRect(rect: Rect): RRect {
    return RRect.fromRectAndCorners({
      rect,
      topLeft: this.topLeft.clamp({ minimum: Radius.zero }),
      topRight: this.topRight.clamp({ minimum: Radius.zero }),
      bottomLeft: this.bottomLeft.clamp({ minimum: Radius.zero }),
      bottomRight: this.bottomRight.clamp({ minimum: Radius.zero }),
    });
  }
}
