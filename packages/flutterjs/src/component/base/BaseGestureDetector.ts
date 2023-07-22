import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject";
import { Constraints, Size, Offset, Matrix4, Decoration } from "../../type";
import type { PaintContext } from "../../utils/type";
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget";
import type Widget from "../../widget/Widget";

class BaseGestureDetector extends SingleChildRenderObjectWidget {
  onClick?: () => void;
  constructor({ child, onClick }: { child?: Widget; onClick?: () => void }) {
    super({ child });
    this.onClick = onClick;
  }

  override createRenderObject(): RenderGestureDetector {
    return new RenderGestureDetector({ onClick: this.onClick });
  }

  updateRenderObject(renderObject: RenderGestureDetector): void {
    renderObject.onClick = this.onClick;
  }
}

class RenderGestureDetector extends SingleChildRenderObject {
  private _onClick: () => void;
  get onClick(): () => void {
    return this._onClick;
  }
  set onClick(prop: (() => void) | undefined) {
    this._onClick = prop ?? function () {};
  }
  constructor({ onClick = () => {} }: { onClick?: () => void }) {
    super({ isPainter: true });
    this.onClick = onClick;
  }

  protected performPaint({ rect }: { rect: SVGRectElement }): void {
    rect.setAttribute("width", `${this.size.width}`);
    rect.setAttribute("height", `${this.size.height}`);
  }

  createDefaultSvgEl({ createSvgEl }: PaintContext) {
    const rect = createSvgEl("rect");
    rect.addEventListener("mousedown", () => this.onClick());
    return {
      rect,
    };
  }
}

export default BaseGestureDetector;
