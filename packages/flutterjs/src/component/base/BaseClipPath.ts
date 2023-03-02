import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject"
import { Size, Constraint } from "../../type"
import { Path } from "../../type/_types/path"
import { PaintContext } from "../../utils/type"
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget"
import type Widget from "../../widget/Widget"

type Clipper = (size: Size) => Path

class BaseClipPath extends SingleChildRenderObjectWidget {
  public clipper: Clipper
  constructor({ child, clipper }: { child?: Widget; clipper: Clipper }) {
    super({ child })
    this.clipper = clipper
  }

  createRenderObject(): SingleChildRenderObject {
    return new RenderClipPath({ clipper: this.clipper })
  }

  updateRenderObject(renderObject: RenderClipPath): void {
    renderObject.clipper = this.clipper
  }
}

class RenderClipPath extends SingleChildRenderObject {
  public clipper: Clipper
  constructor({ clipper }: { clipper: Clipper }) {
    super({ isPainter: true })
    this.clipper = clipper
  }

  protected override preformLayout(): void {}

  protected performPaint({ clipPath }: { [key: string]: SVGElement }): void {
    const pathEl = clipPath.getElementsByTagName("path")[0]
    const pathClip = this.clipper(this.size)

  }

  protected createDefaultSvgEl({ createSvgEl }: PaintContext): {
    [key: string]: SVGElement
  } {
    const clipPath = createSvgEl("clipPath")
    const path = createSvgEl("path")
    clipPath.appendChild(path)
    return {
      clipPath,
    }
  }
}

export default BaseClipPath
