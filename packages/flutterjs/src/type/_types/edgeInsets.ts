import Rect from "./Rect";

type EdgeInsetsProps = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export class EdgeInsetsGeometry {
  top: number;
  bottom: number;
  left: number;
  right: number;

  constructor({ top, bottom, left, right }: EdgeInsetsProps) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
  }

  deflateRect(rect: Rect) {
    return Rect.fromLTRB({
      left: rect.left + this.left,
      top: rect.top + this.top,
      bottom: rect.bottom - this.bottom,
      right: rect.right - this.right,
    });
  }
}

class EdgeInsets extends EdgeInsetsGeometry {
  static all(value: number) {
    return new EdgeInsets({
      top: value,
      bottom: value,
      left: value,
      right: value,
    });
  }

  static symmetric({
    horizontal = 0,
    vertical = 0,
  }: {
    horizontal?: number;
    vertical?: number;
  }) {
    return new EdgeInsets({
      top: vertical,
      bottom: vertical,
      left: horizontal,
      right: horizontal,
    });
  }

  static only({
    top = 0,
    bottom = 0,
    left = 0,
    right = 0,
  }: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  }) {
    return new EdgeInsets({
      top,
      bottom,
      left,
      right,
    });
  }

  static fromLTRB({
    left,
    right,
    top,
    bottom,
  }: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  }) {
    return new EdgeInsets({
      left,
      right,
      bottom,
      top,
    });
  }
}

export default EdgeInsets;
