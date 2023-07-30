class BoxShadow {
  color: string;
  offset: { x: number; y: number };
  blurRadius: number;
  // spreadRadius: number = 0
  // blurStyle = normal

  constructor({
    color = "black",
    offset = { x: 0, y: 0 },
    blurRadius = 0,
  }: {
    color?: string;
    offset?: { x: number; y: number };
    blurRadius?: number;
  } = {}) {
    this.color = color;
    this.offset = offset;
    this.blurRadius = blurRadius;
  }

  static equals(targets: BoxShadow[], others: BoxShadow[]): boolean {
    if (targets.length !== others.length) {
      return false;
    }
    for (let i = 0; i < targets.length; i++) {
      if (!targets[i].eqaul(others[i])) {
        return false;
      }
    }
    return true;
  }

  eqaul(other: BoxShadow): boolean {
    if (this === other) return true;

    return (
      this.color === other.color &&
      this.offset === other.offset &&
      this.blurRadius === other.blurRadius
    );
  }
}

export default BoxShadow;
