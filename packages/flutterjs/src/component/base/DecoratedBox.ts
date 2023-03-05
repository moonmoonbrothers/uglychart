import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject"
import { Constraint, Size, Radius, BorderStyle, Offset } from "../../type"
import type { Border } from "../../type/_types/BorderStyle"
import type { PaintContext } from "../../utils/type"
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget"
import type Widget from "../../widget/Widget"

export type Decoration = {
  color?: string
  border?: BorderStyle
  radius?: Radius
}

class DecoratedBox extends SingleChildRenderObjectWidget {
  decoration: Required<Decoration>
  constructor({
    decoraiton: {
      color = "transparent",
      border = BorderStyle.all({
        color: "rgba(0,0,0,0)",
        thickness: 0,
      }),
      radius = Radius.all(0),
    },
    child,
  }: {
    decoraiton: Decoration
    child?: Widget
  }) {
    super({ child })
    this.decoration = {
      color,
      border,
      radius,
    }
  }

  override createRenderObject(): RenderDocoratedBox {
    return new RenderDocoratedBox(this.decoration)
  }

  updateRenderObject(renderObject: RenderDocoratedBox): void {
    renderObject.decoration = this.decoration
  }
}

class RenderDocoratedBox extends SingleChildRenderObject {
  decoration: Required<Decoration>
  constructor(decoration: Required<Decoration>) {
    super({ isPainter: true })
    this.decoration = decoration
  }

  override getIntrinsicHeight(): number {
    const childHeight = this.child?.getIntrinsicHeight() || 0
    const { top, bottom } = this.decoration.border
    return childHeight + top.thickness + bottom.thickness
  }

  override getIntrinsicWidth(): number {
    const childWidth = this.child?.getIntrinsicWidth() || 0
    const { left, right } = this.decoration.border
    return childWidth + left.thickness + right.thickness
  }

  protected override preformLayout(): void {
    let size = Size.zero()
    const {
      border: { top, left, right, bottom },
    } = this.decoration
    if (this.child != null) {
      this.child.layout(
        new Constraint({
          ...this.constraint,
          maxHeight:
            this.constraint.maxHeight - (top.thickness + bottom.thickness),
          maxWidth:
            this.constraint.maxWidth - (left.thickness + right.thickness),
        })
      )
      size = this.child.size
      this.child.offset.x = left.thickness
      this.child.offset.y = top.thickness
    }
    size.width += left.thickness + right.thickness
    size.height += top.thickness + bottom.thickness
    this.size = this.constraint.constrain(size)
  }
  protected performPaint(
    {
      rect: rectEl,
    }: {
      [key: string]: SVGElement
    },
    offset: Offset
  ): void {
    const {
      color,
      border: {
        top: borderTop,
        left: borderLeft,
        right: borderRight,
        bottom: borderBottom,
      },
      radius: {
        topLeft: topLeftRadius,
        topRight: topRightRadius,
        bottomLeft: bottomLeftRadius,
        bottomRight: bottomRightRadius,
      },
    } = this.decoration
    rectEl.setAttribute(
      "width",
      `${this.size.width - (borderLeft.thickness + borderRight.thickness) / 2}`
    )
    rectEl.setAttribute(
      "height",
      `${this.size.height - (borderBottom.thickness + borderTop.thickness) / 2}`
    )
    rectEl.setAttribute("x", `${borderLeft.thickness / 2}`)
    rectEl.setAttribute("y", `${borderTop.thickness / 2}`)

    this.assertEqualRadius(topLeftRadius, topRightRadius)
    this.assertEqualRadius(topRightRadius, bottomLeftRadius)
    this.assertEqualRadius(bottomLeftRadius, bottomRightRadius)

    rectEl.setAttribute("rx", `${topLeftRadius}`)
    rectEl.setAttribute("ry", `${topRightRadius}`)

    this.assertEqualBorder(borderTop, borderBottom)
    this.assertEqualBorder(borderBottom, borderLeft)
    this.assertEqualBorder(borderLeft, borderRight)

    rectEl.setAttribute("transform", `translate(${offset.x} ${offset.y})`)

    rectEl.setAttribute(
      "style",
      `fill:${color};stroke-width:${borderTop.thickness}px;stroke:${borderTop.color}`
    )
  }

  createDefaultSvgEl({ createSvgEl }: PaintContext): {
    [key: string]: SVGElement
  } {
    return {
      rect: createSvgEl("rect"),
    }
  }

  private assertEqualRadius(radius1: number, radius2: number) {
    if (radius1 !== radius2)
      throw { message: "sorry! It is not implemented to set different radius" }
  }

  private assertEqualBorder(border1: Border, border2: Border) {
    if (
      border1.color !== border2.color ||
      border2.thickness !== border1.thickness
    ) {
      throw {
        message: "sorry! It is not implemented to set different border style",
      }
    }
  }
}

export default DecoratedBox
