import { BorderSide, BorderStyle, ShapeBorder, StrokeAlign } from "./borders";
import EdgeInsets, { EdgeInsetsGeometry } from "./EdgeInsets";
import Path from "./Path";
import Rect from "./Rect";
import BorderRadius from "./BorderRadius";
import { assert } from "../../utils";
import { BoxShape } from "./BoxDecoration";
import BorderRadiusGeometry from "./BorderRadiusGeometry";

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
  paint(
    svgEls: BorderPathEls,
    _: { rect: Rect; borderRadius?: BorderRadiusGeometry; shape?: BoxShape }
  ): void {
    throw new Error("Method not implemented.");
  }

  protected static paintUniformBorderWidthRadius(
    paths: BorderPathEls,
    {
      side,
      borderRadius,
      rect,
    }: { side: BorderSide; borderRadius: BorderRadius; rect: Rect }
  ) {
    assert(side.style !== "none");
    const border = paths.top;
    border.setAttribute("stroke-width", "0");
    border.setAttribute("fill", side.color);

    const borderRect = borderRadius.toRRect(rect);
    const inner = borderRect.deflate(side.strokeInset);
    const outer = borderRect.inflate(side.strokeOutset);
    console.log(inner)

    console.log(inner)

    border.setAttribute("d", new Path().addRRect(inner).getD());

    [("left" as const, "right" as const, "bottom" as const)].forEach((key) => {
      const path = paths[key];
      BorderSide.none.paint(path);
    });
  }

  protected static paintUniformBorderWidthCircle(
    paths: BorderPathEls,
    { side, rect }: { side: BorderSide; rect: Rect }
  ) {
    assert(side.style !== "none");
    const border = paths.top;
    side.paint(border);
    border.setAttribute(
      "d",
      new Path()
        .addOval(
          Rect.fromCircle({
            center: rect.center,
            radius: (rect.shortestSide + side.strokeOffset) / 2,
          })
        )
        .getD()
    );

    [("left" as const, "right" as const, "bottom" as const)].forEach((key) => {
      const path = paths[key];
      BorderSide.none.paint(path);
    });
  }

  protected static paintUniformBorderWidthRectangle(
    paths: BorderPathEls,
    { side, rect }: { side: BorderSide; rect: Rect }
  ) {
    assert(side.style !== "none");
    const border = paths.top;
    side.paint(border);
    border.setAttribute(
      "d",
      new Path().addRect(rect.inflate(side.strokeOffset / 2)).getD()
    );

    [("left" as const, "right" as const, "bottom" as const)].forEach((key) => {
      const path = paths[key];
      BorderSide.none.paint(path);
    });
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
    strokeAlign?: StrokeAlign;
  } = {}) {
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

  paint(
    paths: BorderPathEls,
    {
      rect,
      borderRadius,
      shape = "rectangle",
    }: { rect: Rect; borderRadius?: BorderRadius; shape?: BoxShape }
  ): void {
    if (this.isUniform) {
      switch (this.top.style) {
        case "none":
          Object.values(paths).forEach((path) => {
            path.setAttribute("stroke-width", "0");
            path.setAttribute("fill", "none");
            path.setAttribute("d", "");
          });
          return;
        case "solid":
          switch (shape) {
            case "circle":
              assert(
                borderRadius == null,
                "A borderRadius can only be given for rectangular boxes."
              );
              BoxBorder.paintUniformBorderWidthCircle(paths, {
                side: this.top,
                rect,
              });
              break;
            case "rectangle":
              if (borderRadius != null && borderRadius != BorderRadius.zero) {
                BoxBorder.paintUniformBorderWidthRadius(paths, {
                  side: this.top,
                  borderRadius,
                  rect,
                });

                return;
              }
              BoxBorder.paintUniformBorderWidthRectangle(paths, {
                side: this.top,
                rect,
              });
              break;
          }
          return;
      }
    }
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

type BorderPathEls = {
  top: SVGPathElement;
  bottom: SVGPathElement;
  left: SVGPathElement;
  right: SVGPathElement;
};

export default Border;
