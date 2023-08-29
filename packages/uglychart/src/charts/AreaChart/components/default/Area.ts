import { CustomPaint, Path, Size, Text } from "@moonmoonbrothers/flutterjs";
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
        const count = values.length;
        const points = values.map((value, i) => {
          const x = (i / (count - 1)) * width;
          const y =
            height - ((value - minValue) / (maxValue - minValue)) * height;
          return {
            x,
            y,
          };
        });
        const y0Height =
          height - ((0 - minValue) / (maxValue - minValue)) * height;
        const path = new Path();
        points.forEach((point, i) => {
          if (i === 0) {
            path.moveTo(point);
            return;
          }

          path.lineTo(point);
        });

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
