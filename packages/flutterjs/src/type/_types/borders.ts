import { EdgeInsetsGeometry } from "./EdgeInsets";
import Path from "./Path";
import Rect from "./Rect";

export interface ShapeBorder {
  get dimensions(): EdgeInsetsGeometry;

  getInnerPath(rect: Rect): Path;
  getOuterPath(rect: Rect): Path;

  //paint
}

export class BorderSide {
  color: string;
  width: number;
  style: BorderStyle;
  strokeAlign: number;
  constructor({
    style = "solid",
    width = 1,
    color = "black",
    strokeAlign = BorderSide.strokeAlignInside,
  }: {
    color?: string;
    width?: number;
    style?: BorderStyle;
    strokeAlign?: number;
  }) {
    this.color = color;
    this.style = style;
    this.width = width;
    this.strokeAlign = strokeAlign;
  }

  static strokeAlignInside = -1 as const;
  static strokeAlignCenter = 0 as const;
  static strokeAlignOutside = 1 as const;
  static none = new BorderSide({ width: 0, style: "none" });

  get strokeInset(): number {
    return this.width * (1 - (1 + this.strokeAlign) / 2);
  }

  get strokeOutset(): number {
    return (this.width * (1 + this.strokeAlign)) / 2;
  }

  get strokeOffset() {
    return this.width * this.strokeAlign;
  }
}

export type BorderStyle = "solid" | "none";
