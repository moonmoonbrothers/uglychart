import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject";
import { Constraints, Size } from "../../type";
import { PaintContext } from "../../utils/type";
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget";
import type Widget from "../../widget/Widget";

export type Painter<T extends Record<string, SVGElement>> = {
  paint: (els: T, size: Size) => void;
  createDefaultSvgEl: (context: PaintContext) => T;
};

class BaseCustomPaint<
  T extends Record<string, SVGElement>
> extends SingleChildRenderObjectWidget {
  painter: Painter<T>;
  size: Size;
  constructor({
    child,
    size = Size.zero,
    painter,
  }: {
    child?: Widget;
    size?: Size;
    painter: Painter<T>;
  }) {
    super({ child });
    this.painter = painter;
    this.size = size;
  }

  createRenderObject(): RenderCustomPaint<T> {
    return new RenderCustomPaint({
      painter: this.painter,
      preferredSize: this.size,
    });
  }

  updateRenderObject(renderObject: RenderCustomPaint<T>): void {
    renderObject.painter = this.painter;
    renderObject.preferredSize = this.size;
  }
}

export class RenderCustomPaint<
  T extends Record<string, SVGElement>
> extends SingleChildRenderObject {
  painter: Painter<T>;
  preferredSize: Size;

  constructor({
    preferredSize = Size.zero,
    painter,
  }: {
    preferredSize?: Size;
    painter: Painter<T>;
  }) {
    super({ isPainter: true });
    this.painter = painter;
    this.preferredSize = preferredSize;
  }
  protected computeSizeForNoChild(constraints: Constraints): Size {
    return constraints.constrain(this.preferredSize)
  }


  protected performPaint(
    svgEls: { [key: string]: SVGElement },
    context: PaintContext
  ): void {}

  protected createDefaultSvgEl(paintContext: PaintContext): {
    [key: string]: SVGElement;
  } {
    return {};
  }

  override getIntrinsicWidth(height: number): number {
    return 0;
    return this.child?.getIntrinsicWidth(height) || 0;
  }

  override getIntrinsicHeight(width: number): number {
    return 0;
    return this.child?.getIntrinsicHeight(width) || 0;
  }
}

export default BaseCustomPaint;
