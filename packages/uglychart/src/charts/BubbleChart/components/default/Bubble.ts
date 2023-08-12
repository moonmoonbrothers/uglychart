import {
  CustomPaint,
  Offset,
  Path,
  Rect,
  Size,
} from "@moonmoonbrothers/flutterjs";
import { Scale } from "../../types";

export default function Scatter({
  color,
  points,
  bubbleMinRadius,
  bubbleMaxRadius,
  scale,
}: {
  bubbleMinRadius: number;
  bubbleMaxRadius: number;
  color: string;
  points: { x: number; y: number; value: number }[];
  scale: Scale;
}) {
  return CustomPaint({
    size: Size.infinite,
    painter: {
      createDefaultSvgEl(context) {
        return {
          bubble: context.createSvgEl("path"),
        };
      },

      paint({ bubble: bubbleEl }, { width, height }) {
        const resolvedPoints = points.map(({ x, y, value }) => ({
          x: ((x - scale.x.min) / (scale.x.max - scale.x.min)) * width,
          y:
            height - ((y - scale.y.min) / (scale.y.max - scale.y.min)) * height,
          r:
            bubbleMinRadius +
            ((value - scale.value.min) / (scale.value.max - scale.value.min)) *
              (bubbleMaxRadius - bubbleMinRadius),
        }));

        const pathHelper = new Path();

        resolvedPoints.forEach(({ r, ...center }) => {
          pathHelper.addOval(
            Rect.fromCircle({
              center: new Offset(center),
              radius: r,
            })
          );
        });

        bubbleEl.setAttribute("fill", color);
        bubbleEl.setAttribute("stroke-width", `0`);
        bubbleEl.setAttribute("d", pathHelper.getD());
        bubbleEl.setAttribute("opacity", "0.8");
      },
    },
  });
}
