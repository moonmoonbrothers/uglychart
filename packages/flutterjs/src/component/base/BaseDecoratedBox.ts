import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject";
import { Constraints, Size, Offset, Matrix4, Decoration } from "../../type";
import type { PaintContext } from "../../utils/type";
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget";
import type Widget from "../../widget/Widget";

class DecoratedBox extends SingleChildRenderObjectWidget {
  decoration: Decoration;
  constructor({
    decoration,
    child,
  }: {
    decoration: Decoration;
    child?: Widget;
  }) {
    super({ child });
    this.decoration = decoration;
  }

  override createRenderObject(): RenderDecoratedBox {
    return new RenderDecoratedBox({ decoration: this.decoration });
  }

  updateRenderObject(renderObject: RenderDecoratedBox): void {
    renderObject.decoration = this.decoration;
  }
}

class RenderDecoratedBox extends SingleChildRenderObject {
  decoration: Decoration;
  constructor({ decoration }: { decoration: Decoration }) {
    super({ isPainter: true });
    this.decoration = decoration;
  }

  protected override preformLayout(): void {
    this.child?.layout(this.constraints);
    this.size = this.child?.size ?? Size.zero();
  }
  protected performPaint(
    svgEls: {
      box: SVGElement;
      topBorder: SVGElement;
      bottomBorder: SVGElement;
      leftBorder: SVGElement;
      rightBorder: SVGElement;
    },
    offset: Offset,
    matrix: Matrix4
  ): void {

    const painter = this.decoration.createBoxPainter();

    painter.paint(svgEls, this.size);
  }

  createDefaultSvgEl({ createSvgEl }: PaintContext): {
    [key: string]: SVGElement;
  } {
    return {
      box: createSvgEl("path"),
      topBorder: createSvgEl("path"),
      leftBorder: createSvgEl("path"),
      rightBorder: createSvgEl("path"),
      bottomBorder: createSvgEl("path"),
    };
  }
}

export default DecoratedBox;
