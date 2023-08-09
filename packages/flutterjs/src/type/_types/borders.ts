import { assert } from "../../utils";
import Data from "./Data";
import { EdgeInsetsGeometry } from "./EdgeInsets";
import Path from "./Path";
import Rect from "./Rect";

export type StrokeAlign = number; //-1 | 0 | 1;

export interface ShapeBorder {
  get dimensions(): EdgeInsetsGeometry;

  getInnerPath(rect: Rect): Path;
  getOuterPath(rect: Rect): Path;
  paint(svgEls: Record<string, SVGElement>, _: { rect: Rect }): void;
}

export class BorderSide extends Data {
  readonly color: string;
  readonly width: number;
  readonly style: BorderStyle;
  readonly strokeAlign: StrokeAlign;
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
    super();
    this.color = color;
    this.style = style;
    this.width = width;
    assert(
      strokeAlign >= -1 && strokeAlign <= 1,
      "strokeAlign must be between -1 and 1"
    );
    this.strokeAlign = strokeAlign;
  }

  /**
   * @deprecated The method should not be used
   */
  equal(other: BorderSide) {
    return this.equals(other);
  }

  equals(other: BorderSide): boolean {
    if (this === other) return true;
    return (
      this.color === other.color &&
      this.width === other.width &&
      this.style === other.style &&
      this.strokeAlign === other.strokeAlign
    );
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
