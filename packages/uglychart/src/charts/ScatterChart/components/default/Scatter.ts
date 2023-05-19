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
  dotRadius,
  scale,
}: {
  dotRadius: number;
  color: string;
  points: { x: number; y: number }[];
  scale: Scale;
}) {
  return CustomPaint({
    size: Size.infinite,
    painter: {
      createDefaultSvgEl(context) {
        return {
          scatter: context.createSvgEl("path"),
        };
      },

      paint({ scatter: scatterEl }, { width, height }) {
        const resolvedPoints = points.map(({ x, y }) => ({
          x: ((x - scale.x.min) / (scale.x.max - scale.x.min)) * width,
          y:
            height - ((y - scale.y.min) / (scale.y.max - scale.y.min)) * height,
        }));

        const pathHelper = new Path();

        resolvedPoints.forEach((center) => {
          pathHelper.addOval(
            Rect.fromCircle({ center: new Offset(center), radius: dotRadius })
          );
        });

        scatterEl.setAttribute("stroke", color);
        scatterEl.setAttribute("fill", "none");
        scatterEl.setAttribute("stroke-width", `2`);
        scatterEl.setAttribute("d", pathHelper.getD());
      },
    },
  });
}
