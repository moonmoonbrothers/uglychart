import SingleChildRenderObject from "$lib/flutter/renderobject/SingleChildRenderObject"
import { Constraint, Size, Radius, BorderStyle } from "$lib/flutter/type"
import type { PaintContext } from "$lib/flutter/utils/type"
import SingleChildRenderObjectWidget from "$lib/flutter/widget/SingleChildRenderObjectWidget"
import type Widget from "$lib/flutter/widget/Widget"

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
    super()
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

  protected override performPaint({ ctx }: PaintContext): void {
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

    //draw background start
    ctx.beginPath()
    ctx.fillStyle = color
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(ctx as any).roundRect(
      borderLeft.thickness,
      borderTop.thickness,
      this.size.width - (borderLeft.thickness + borderRight.thickness),
      this.size.height - (borderTop.thickness + borderBottom.thickness),
      [topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius]
    )
    ctx.fill()
    //draw background end

    this.drawBorders(ctx)
  }

  private drawBorders(ctx: CanvasRenderingContext2D) {
    const edgesPos = {
      topLeft: {
        x: 0,
        y: 0,
        angle: Math.PI * (5 / 4),
      },
      topRight: {
        x: this.size.width,
        y: 0,
        angle: (-1 * Math.PI) / 4,
      },
      bottomLeft: {
        x: 0,
        y: this.size.height,
        angle: Math.PI * (3 / 4),
      },
      bottomRight: {
        x: this.size.width,
        y: this.size.height,
        angle: Math.PI / 4,
      },
    }
    const signs = {
      top: 1,
      left: 1,
      bottom: -1,
      right: -1,
    }

    const configs: ("left" | "right" | "top" | "bottom")[] = [
      "left",
      "right",
      "bottom",
      "top",
    ]

    configs.forEach((main) => {
      const mainBorder = this.decoration.border[main]
      let adjacencies: ("left" | "right" | "top" | "bottom")[]
      let mainPosKey: "x" | "y"
      let subPosKey: "x" | "y"

      if (["bottom", "top"].includes(main)) {
        adjacencies = ["left", "right"]
        mainPosKey = "y"
        subPosKey = "x"
      } else {
        adjacencies = ["top", "bottom"]
        mainPosKey = "x"
        subPosKey = "y"
      }

      const [moveTo, lineTo] = adjacencies.map((sub) => {
        const edgeKey = this.getEdgeKey(main, sub)
        const subBorder = this.decoration.border[sub]
        const radius = this.decoration.radius[edgeKey]
        const edgePos = edgesPos[edgeKey]
        return {
          [mainPosKey]:
            edgePos[mainPosKey] + (signs[main] * mainBorder.thickness) / 2,
          [subPosKey]:
            edgePos[subPosKey] + signs[sub] * (subBorder.thickness + radius),
        }
      })

      ctx.beginPath()
      ctx.lineWidth = mainBorder.thickness
      ctx.strokeStyle = mainBorder.color
      ctx.moveTo(moveTo.x, moveTo.y)
      ctx.lineTo(lineTo.x, lineTo.y)
      ctx.stroke()

      adjacencies.forEach((sub) => {
        const edgeKey = this.getEdgeKey(main, sub)
        const subBorder = this.decoration.border[sub]
        const radius = this.decoration.radius[edgeKey]
        const edgePos = edgesPos[edgeKey]

        if (subBorder.thickness === 0) return

        const [xKey, yKey] = mainPosKey === "x" ? [main, sub] : [sub, main]
        const innerEdgePos = {
          x: edgePos.x + signs[xKey] * this.decoration.border[xKey].thickness,
          y: edgePos.y + signs[yKey] * this.decoration.border[yKey].thickness,
        }
        const isAntiClockWise =
          (mainPosKey === "x" ? 1 : -1) * signs[main] * signs[sub] > 0

        if (radius !== 0) {
          ctx.beginPath()
          ctx.arc(
            innerEdgePos.x + signs[xKey] * radius,
            innerEdgePos.y + signs[yKey] * radius,
            radius + mainBorder.thickness / 2,
            edgePos.angle,
            edgePos.angle + ((isAntiClockWise ? -1 : 1) * Math.PI) / 4,
            isAntiClockWise
          )
          ctx.stroke()
        } else {
          ctx.beginPath()
          ctx.moveTo(edgePos.x, edgePos.y)
          ctx.lineTo(innerEdgePos.x, innerEdgePos.y)
          const [x, y] =
            mainPosKey !== "x"
              ? [innerEdgePos.x, edgePos.y]
              : [edgePos.x, innerEdgePos.y]
          ctx.lineTo(x, y)
          ctx.fillStyle = mainBorder.color
          ctx.fill()
        }
      })
    })
  }

  private getEdgeKey(
    type1: "left" | "right" | "top" | "bottom",
    type2: "left" | "right" | "top" | "bottom"
  ): "topLeft" | "topRight" | "bottomLeft" | "bottomRight" {
    const [vertical, horizon] = ["top", "bottom"].includes(type1)
      ? [type1, type2]
      : [type2, type1]

    return (vertical +
      horizon.replace(/^[a-z]/, (char) => char.toUpperCase())) as
      | "topLeft"
      | "topRight"
      | "bottomLeft"
      | "bottomRight"
  }
}

export default DecoratedBox
