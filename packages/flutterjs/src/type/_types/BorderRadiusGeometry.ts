import Radius from "./Radius";
import RRect from "./RRect";
import Rect from "./Rect";
import Calculatable from "./Caculatable";

class BorderRadiusGeometry extends Calculatable {
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
    super();
    this.bottomLeft = bottomLeft;
    this.bottomRight = bottomRight;
    this.topLeft = topLeft;
    this.topRight = topRight;
  }

  equals(other: BorderRadiusGeometry): boolean {
    if (this === other) return true;
    return (
      this.topLeft.equals(other.topLeft) &&
      this.topRight.equals(other.topRight) &&
      this.bottomLeft.equals(other.bottomLeft) &&
      this.bottomRight.equals(other.bottomRight)
    );
  }

  plus(other: BorderRadiusGeometry): BorderRadiusGeometry {
    return new BorderRadiusGeometry({
      topLeft: this.topLeft.plus(other.topLeft),
      topRight: this.topRight.plus(other.topRight),
      bottomLeft: this.bottomLeft.plus(other.bottomLeft),
      bottomRight: this.bottomRight.plus(other.bottomRight),
    });
  }

  multiply(value: number): BorderRadiusGeometry {
    return new BorderRadiusGeometry({
      topLeft: this.topLeft.multiply(value),
      topRight: this.topRight.multiply(value),
      bottomLeft: this.bottomLeft.multiply(value),
      bottomRight: this.bottomRight.multiply(value),
    });
  }

  /**
   * @deprecated The method should not be used
   */
  equal(other: BorderRadiusGeometry): boolean {
    return this.equals(other);
  }

  toRRect(rect: Rect): RRect {
    throw new Error("Not implemented");
  }
}

export default BorderRadiusGeometry;
