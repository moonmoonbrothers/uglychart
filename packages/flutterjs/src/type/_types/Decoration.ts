import { BoxBorder } from "./BoxBorder";
import { BorderRadiusGeometry } from "./BorderRadius";
import { EdgeInsetsGeometry } from "./EdgeInsets";
import Path from "./Path";
import Rect from "./Rect";

export interface Decoration {
  get padding(): EdgeInsetsGeometry | undefined;
  getClipPath(rect: Rect): Path;
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
}

export type BoxShape = "rectangle" | "circle";
