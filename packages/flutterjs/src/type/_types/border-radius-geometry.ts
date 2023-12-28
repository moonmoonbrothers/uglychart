import Radius from "./_radius";
import RRect from "./r-rect";
import Rect from "./_rect";
import Calculatable from "./_calculable";
import Utils from "../../utils";

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

  static lerp(a: BorderRadiusGeometry, b: BorderRadiusGeometry, t) {
    const result = Utils.lerp(a, b, t);
    return result;
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
