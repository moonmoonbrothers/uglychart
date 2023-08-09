import Calculatable from "./Caculatable";
import Offset from "./Offset";

class BoxShadow extends Calculatable {
  readonly color: string;
  readonly offset: Offset;
  readonly blurRadius: number;

  constructor({
    color = "black",
    offset = { x: 0, y: 0 },
    blurRadius = 0,
  }: {
    color?: string;
    offset?: { x: number; y: number };
    blurRadius?: number;
  } = {}) {
    super();
    this.color = color;
    this.offset = new Offset({ x: offset.x, y: offset.y });
    this.blurRadius = blurRadius;
  }

  static equals(targets: BoxShadow[], others: BoxShadow[]): boolean {
    if (targets.length !== others.length) {
      return false;
    }
    for (let i = 0; i < targets.length; i++) {
      if (!targets[i].equals(others[i])) {
        return false;
      }
    }
    return true;
  }

  static lerp(a: BoxShadow[], b: BoxShadow[], t: number) {}

  equals(other: BoxShadow): boolean {
    if (this === other) return true;

    return (
      this.color === other.color &&
      this.offset.equals(other.offset) &&
      this.blurRadius === other.blurRadius
    );
  }

  /**
   * @deprecated The method should not be used
   */
  eqaul(other: BoxShadow): boolean {
    return this.equals(other);
  }
}

export default BoxShadow;
