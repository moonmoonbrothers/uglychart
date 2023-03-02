import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject"
import { Size, Constraint } from "../../type"
import { Path } from "../../type/_types/Path"
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
  protected getChildClipId(
    parentClipId?: string | undefined
  ): string | undefined {
    return this.id
  }

  protected override preformLayout(): void {
    this.child?.layout(this.constraint)
    this.size = this.child?.size ?? Size.zero()
  }

  protected performPaint({ clipPath }: { [key: string]: SVGElement }): void {
    const pathEl = clipPath.getElementsByTagName("path")[0]
    const d = this.clipper(this.size).getD()

    pathEl.setAttribute("stroke-width", "0")
    pathEl.setAttribute("d", d)
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
