import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject";
import { Size } from "../../type";
import type { PaintContext } from "../../utils/type";
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget";
import type Widget from "../../widget/Widget";

class ColoredBox extends SingleChildRenderObjectWidget {
  color: string;
  constructor({ color, child }: { color: string; child?: Widget }) {
    super({ child });
    this.color = color;
  }

  override createRenderObject(): RenderColoredBox {
    return new RenderColoredBox({ color: this.color });
  }

  updateRenderObject(renderObject: RenderColoredBox): void {
    renderObject.color = this.color;
  }
}

class RenderColoredBox extends SingleChildRenderObject {
  color: string;
  constructor({ color }: { color: string }) {
    super({ isPainter: true });
    this.color = color;
  }

  protected override preformLayout(): void {
    this.child?.layout(this.constraints);
    this.size = this.child?.size ?? Size.zero();
  }
  protected performPaint({rect}: {
    rect: SVGElement;
  }): void {
    rect.setAttribute("fill", this.color)
    rect.setAttribute("width", `${this.size.width}`) 
    rect.setAttribute("height", `${this.size.height}`) 
  }

  createDefaultSvgEl({ createSvgEl }: PaintContext): {
    [key: string]: SVGElement;
  } {
    return {
      rect: createSvgEl("rect"),
    };
  }
}

export default ColoredBox;
