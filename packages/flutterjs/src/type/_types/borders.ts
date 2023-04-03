import { EdgeInsetsGeometry } from "./EdgeInsets";
import Path from "./Path";
import Rect from "./Rect";

export type StrokeAlign = -1 | 0 | 1

export interface ShapeBorder {
  get dimensions(): EdgeInsetsGeometry;

  getInnerPath(rect: Rect): Path;
  getOuterPath(rect: Rect): Path;
  paint(svgEls: Record<string, SVGElement>, _: { rect: Rect }): void;
}

export class BorderSide {
  color: string;
  width: number;
  style: BorderStyle;
  strokeAlign: StrokeAlign
  constructor({
    style = "solid",
    width = 1,
    color = "black",
    strokeAlign = BorderSide.strokeAlignInside,
  }: {
    color?: string;
    width?: number;
    style?: BorderStyle;
    strokeAlign?: StrokeAlign;
  } = {}) {
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

  paint(path: SVGPathElement) {
    if (this.style === "none") {
      path.setAttribute("stroke-width", "0");
      path.setAttribute("stroke", "transparent");
    } else {
      path.setAttribute("stroke-width", `${this.width}`);
      path.setAttribute("stroke", `${this.color}`);
    }

    path.setAttribute("fill", "none");
  }
}

export type BorderStyle = "solid" | "none";
