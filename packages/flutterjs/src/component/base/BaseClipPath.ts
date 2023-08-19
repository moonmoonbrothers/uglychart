import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject";
import { Size, Constraints, Offset } from "../../type";
import { Path } from "../../type/_types/Path";
import { PaintContext } from "../../utils/type";
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget";
import type Widget from "../../widget/Widget";

type Clipper = (size: Size) => Path;

class BaseClipPath extends SingleChildRenderObjectWidget {
  public clipper: Clipper;
  constructor({
    child,
    clipper,
    key,
  }: {
    child?: Widget;
    clipper: Clipper;
    key?: any;
  }) {
    super({ child, key });
    this.clipper = clipper;
  }

  createRenderObject(): SingleChildRenderObject {
    return new RenderClipPath({ clipper: this.clipper });
  }

  updateRenderObject(renderObject: RenderClipPath): void {
    renderObject.clipper = this.clipper;
  }
}

class RenderClipPath extends SingleChildRenderObject {
  _clipper: Clipper;
  get clipper() {
    return this._clipper;
  }

  set clipper(value: Clipper) {
    if (this._clipper === value) return;
    this._clipper = value;
    this.markNeedsPaint();
  }
  constructor({ clipper }: { clipper: Clipper }) {
    super({ isPainter: true });
    this._clipper = clipper;
  }
  protected getChildClipId(
    parentClipId?: string | undefined
  ): string | undefined {
    return this.id;
  }

  protected performPaint({ clipPath }: { [key: string]: SVGElement }): void {
    const pathEl = clipPath.getElementsByTagName("path")[0];
    const d = this.clipper(this.size).getD();
    pathEl.setAttribute("d", d);
  }

  protected createDefaultSvgEl({ createSvgEl }: PaintContext): {
    [key: string]: SVGElement;
  } {
    const clipPath = createSvgEl("clipPath");
    clipPath.setAttribute("id", this.id);
    const path = createSvgEl("path");
    path.setAttribute("stroke-width", "0");
    clipPath.appendChild(path);
    return {
      clipPath,
    };
  }
}

export default BaseClipPath;
