import { CustomPaint, Path, Size } from "@moonmoonbrothers/flutterjs";
import { drawLine } from "../../../LineChart/components/default/Line";
export default function Area({
  thickness = 2,
  color,
  minValue,
  maxValue,
  values,
  spline = false,
}: {
  thickness?: number;
  color: string;
  values: number[];
  minValue: number;
  maxValue: number;
  spline?: boolean;
}) {
  return CustomPaint({
    size: Size.infinite,
    painter: {
      createDefaultSvgEl(context) {
        return {
          line: context.createSvgEl("path"),
          area: context.createSvgEl("path"),
        };
      },

      paint({ line: lineEl, area: areaEl }, { width, height }) {
        const path = new Path();
        drawLine(path, {
          width,
          height,
          maxValue,
          minValue,
          values,
          spline,
        });
        const y0Height =
          height - ((0 - minValue) / (maxValue - minValue)) * height;

        lineEl.setAttribute("stroke", color);
        lineEl.setAttribute("fill", "none");
        lineEl.setAttribute("stroke-width", `${thickness}`);
        lineEl.setAttribute("d", path.getD());

        areaEl.setAttribute("fill", color);
        path
          .lineTo({ x: width, y: y0Height })
          .lineTo({ x: 0, y: y0Height })
          .close();
        areaEl.setAttribute("d", path.getD());
        areaEl.setAttribute("opacity", "0.3");
      },
    },
  });
}
