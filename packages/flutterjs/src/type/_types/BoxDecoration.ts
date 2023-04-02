import { BoxBorder } from "./BoxBorder";
import BorderRadius, { BorderRadiusGeometry } from "./BorderRadius";
import { EdgeInsetsGeometry } from "./EdgeInsets";
import Path from "./Path";
import Rect from "./Rect";
import Size from "./Size";
import { assert } from "../../utils";
import RRect from "./RRect";

export interface Decoration {
  get padding(): EdgeInsetsGeometry | undefined;
  getClipPath(rect: Rect): Path;
  createBoxPainter(): BoxPainter;
}

export default class BoxDecoration implements Decoration {
  color?: string;
  //image?: DecorationImage
  border?: BoxBorder;
  borderRadius?: BorderRadiusGeometry;
  //boxShadow?: BoxShadow[]
  //gradient?: Gradient
  //blendMode?: BlendMode
  shape: BoxShape;

  constructor({
    color,
    border,
    borderRadius,
    shape = "rectangle",
  }: {
    color?: string;
    border?: BoxBorder;
    borderRadius?: BorderRadiusGeometry;
    shape?: BoxShape;
  }) {
    this.color = color;
    this.border = border;
    this.borderRadius = borderRadius;
    this.shape = shape;
  }

  get padding(): EdgeInsetsGeometry | undefined {
    return this.border?.dimensions;
  }

  getClipPath(rect: Rect): Path {
    switch (this.shape) {
      case "circle":
        const center = rect.center;
        const radius = rect.shortestSide / 2;
        const square = Rect.fromCircle({ center, radius });
        return new Path().addOval(square);
      case "rectangle":
        if (this.borderRadius != null) {
          return new Path().addRRect(this.borderRadius.toRRect(rect));
        }
        return new Path().addRect(rect);
    }
  }

  createBoxPainter(): BoxPainter {
    return new BoxDecorationPainter(this);
  }
}

export type BoxShape = "rectangle" | "circle";

type BoxDecorationSvgEls = {
  topBorder: SVGPathElement;
  leftBorder: SVGPathElement;
  rightBorder: SVGPathElement;
  bottomBorder: SVGPathElement;
  box: SVGPathElement;
};

class BoxDecorationPainter implements BoxPainter {
  constructor(private decoration: BoxDecoration) {}

  paint(svgEls: BoxDecorationSvgEls, size: Size) {
    const rect = Rect.fromLTWH({
      left: 0,
      top: 0,
      width: size.width,
      height: size.height,
    });

    this.paintBackgroundColor(svgEls.box, rect);

    this.decoration.border?.paint(
      {
        top: svgEls.topBorder,
        bottom: svgEls.bottomBorder,
        left: svgEls.leftBorder,
        right: svgEls.rightBorder,
      },
      {
        rect,
        shape: this.decoration.shape,
        borderRadius: this.decoration.borderRadius,
      }
    );
  }

  private paintShadows(box: SVGPathElement, rect: Rect) {}

  private paintBackgroundColor(box: SVGPathElement, rect: Rect) {
    box.setAttribute("stroke-width", "0");
    box.setAttribute("fill", this.decoration.color || "none");

    if (this.decoration.borderRadius == null) {
      box.setAttribute("d", new Path().addRect(rect).getD());
      return;
    }

    box.setAttribute(
      "d",
      new Path()
        .addRRect(
          RRect.fromRectAndCorners({
            rect,
            topLeft: this.decoration.borderRadius.topLeft,
            topRight: this.decoration.borderRadius.topRight,
            bottomLeft: this.decoration.borderRadius.bottomLeft,
            bottomRight: this.decoration.borderRadius.bottomRight,
          })
        )
        .getD()
    );
  }

  private paintBackgroundImage(svgEls: BoxDecorationSvgEls, rect: Rect) {
    // Not Implemented yet!!
  }
}

interface BoxPainter {
  paint(svgEls: Record<string, SVGElement>, size: Size): void;
}
