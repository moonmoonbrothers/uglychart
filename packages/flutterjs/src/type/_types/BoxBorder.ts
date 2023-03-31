import { BorderSide, BorderStyle, ShapeBorder } from "./borders";
import EdgeInsets, { EdgeInsetsGeometry } from "./EdgeInsets";
import Path from "./Path";
import Rect from "./Rect";

export class BoxBorder implements ShapeBorder {
  get dimensions(): EdgeInsetsGeometry {
    throw new Error("Method not implemented.");
  }
  getInnerPath(rect: Rect): Path {
    return new Path().addRect(this.dimensions.deflateRect(rect));
  }
  getOuterPath(rect: Rect): Path {
    return new Path().addRect(rect);
  }
}

class Border extends BoxBorder {
  top: BorderSide;
  right: BorderSide;
  bottom: BorderSide;
  left: BorderSide;
  constructor({
    top = BorderSide.none,
    right = BorderSide.none,
    bottom = BorderSide.none,
    left = BorderSide.none,
  }: {
    top?: BorderSide;
    right?: BorderSide;
    bottom?: BorderSide;
    left?: BorderSide;
  }) {
    super();
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
  }

  static fromBorderSide(side: BorderSide) {
    return new Border({ left: side, right: side, bottom: side, top: side });
  }

  static symmetric({
    vertical = BorderSide.none,
    horizontal = BorderSide.none,
  }: {
    vertical?: BorderSide;
    horizontal?: BorderSide;
  }) {
    return new Border({
      left: vertical,
      right: vertical,
      top: horizontal,
      bottom: horizontal,
    });
  }

  static all({
    color = "black",
    width = 1,
    style = "solid",
    strokeAlign = BorderSide.strokeAlignInside,
  }: {
    color?: string;
    width?: number;
    style?: BorderStyle;
    strokeAlign?: number;
  }) {
    const side = new BorderSide({ strokeAlign, style, color, width });
    return Border.fromBorderSide(side);
  }

  get dimensions(): EdgeInsetsGeometry {
    if (this._widthIsUniform) {
      return EdgeInsets.all(this.top.strokeAlign);
    }

    return EdgeInsets.fromLTRB({
      left: this.left.strokeInset,
      right: this.right.strokeInset,
      bottom: this.bottom.strokeInset,
      top: this.top.strokeInset,
    });
  }

  get isUniform() {
    return (
      this._colorIsUniform &&
      this._styleIsUniform &&
      this._strokeAlignIsUniform &&
      this._widthIsUniform
    );
  }

  private get _colorIsUniform(): boolean {
    const topColor = this.top.color;
    return (
      this.right.color == topColor &&
      this.bottom.color == topColor &&
      this.left.color == topColor
    );
  }

  private get _widthIsUniform() {
    const topWidth = this.top.width;
    return (
      this.right.width === topWidth &&
      this.bottom.width === topWidth &&
      this.left.width === topWidth
    );
  }

  private get _styleIsUniform() {
    const topStyle = this.top.style;
    return (
      this.right.style == topStyle &&
      this.bottom.style == topStyle &&
      this.left.style == topStyle
    );
  }

  private get _strokeAlignIsUniform() {
    const topStrokeAlign = this.top.strokeAlign;

    return (
      this.right.strokeAlign == topStrokeAlign &&
      this.bottom.strokeAlign == topStrokeAlign &&
      this.left.strokeAlign == topStrokeAlign
    );
  }
}

export default Border;
