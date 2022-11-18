import SingleChildRenderObject from "$lib/flutter/renderobject/SingleChildRenderObject"
import BorderStyle from "$lib/flutter/utils/borderstyle"
import Constraint from "$lib/flutter/utils/constraint"
import Radius from "$lib/flutter/utils/radius"
import Size from "$lib/flutter/utils/size"
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
}

class RenderDocoratedBox extends SingleChildRenderObject {
  decoration: Required<Decoration>
  constructor(decoration: Required<Decoration>) {
    super()
    this.decoration = decoration
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
      borderTop.thickness,
      borderLeft.thickness,
      this.size.width - (borderLeft.thickness + borderRight.thickness),
      this.size.height - (borderTop.thickness + borderBottom.thickness),
      [topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius]
    )
    ctx.fill()
    //draw background end

    const configs: {
      type: "left" | "right" | "top" | "bottom"
      getEdgeRaidusCenterOffset: (radius: number) => {
        x: number
        y: number
      }
      edges: {
        type: "topLeft" | "topRight" | "bottomLeft" | "bottomRight"
        position: {
          x: number
          y: number
        }
        startAngle: number
      }[]
    }[] = [
      {
        type: "top",
        getEdgeRaidusCenterOffset(radius) {
          return {
            x: 0,
            y: radius,
          }
        },
        edges: [
          {
            type: "topLeft",
            position: {
              x: borderLeft.thickness + topLeftRadius,
              y: borderTop.thickness / 2
            },
            startAngle: Math.PI * ( 5 / 4),
          },
          {
            type: "topRight",
            startAngle: - Math.PI / 2,
            position: {
              x: this.size.width - (borderRight.thickness + topRightRadius),
              y: borderTop.thickness / 2
            },
          },
        ],
      },
      {
        type: "right",
        getEdgeRaidusCenterOffset(radius) {
          return {
            x: -radius,
            y: 0,
          }
        },
        edges: [
          {
            type: "topRight",
            position: {
              x: this.size.width - borderRight.thickness / 2,
              y: borderTop.thickness + topRightRadius,
            },
            startAngle: -Math.PI / 4,
          },
          {
            type: "bottomRight",
            startAngle: 0,
            position: {
              x: this.size.width - borderRight.thickness / 2,
              y:
                this.size.height - (borderBottom.thickness + bottomRightRadius),
            },
          },
        ],
      },
      {
        type: "left",
        getEdgeRaidusCenterOffset(radius) {
          return {
            x: radius,
            y: 0,
          }
        },
        edges: [
          {
            type: "topLeft",
            position: {
              x: borderLeft.thickness / 2,
              y: borderTop.thickness + topLeftRadius,
            },
            startAngle: Math.PI,
          },
          {
            type: "bottomLeft",
            startAngle: Math.PI / 2 + Math.PI / 4,
            position: {
              x: borderLeft.thickness / 2,
              y: this.size.height - (borderBottom.thickness + bottomLeftRadius),
            },
          },
        ],
      },
    ]

    configs.forEach(({ type, edges, getEdgeRaidusCenterOffset }) => {
      const { color, thickness } = this.decoration.border[type]
      ctx.beginPath()
      ctx.lineWidth = thickness
      ctx.strokeStyle = color
      const moveTo = edges[0].position
      const lineTo = edges[1].position
      ctx.moveTo(moveTo.x, moveTo.y)
      ctx.lineTo(lineTo.x, lineTo.y)
      ctx.stroke()
      edges.forEach((edge) => {
        const configRadius = this.decoration.radius[edge.type]
        ctx.beginPath()
        if (configRadius !== 0) {
          const radius = configRadius + thickness / 2
          const offset = getEdgeRaidusCenterOffset(radius)
          ctx.arc(
            edge.position.x + offset.x,
            edge.position.y + offset.y,
            radius,
            edge.startAngle,
            edge.startAngle + Math.PI / 4
          )
        } else {
          //
        }
        ctx.stroke()
      })
    })
  }
}

export default DecoratedBox
