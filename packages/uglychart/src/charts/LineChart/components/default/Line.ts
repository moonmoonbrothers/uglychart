import { CustomPaint, Path, Size, Text } from "@moonmoonbrothers/flutterjs";
export default function Line({
  thickness,
  color,
  minValue,
  maxValue,
  values,
}: {
  thickness: number;
  color: string;
  values: number[];
  minValue: number;
  maxValue: number;
}) {
  return CustomPaint({
    size: Size.infinite,
    painter: {
      createDefaultSvgEl(context) {
        return {
          path: context.createSvgEl("path"),
        };
      },

      paint({ path: pathEl }, { width, height }) {
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
        const path = new Path();
        points.forEach((point, i) => {
          if (i === 0) {
            path.moveTo(point);
            return;
          }

          path.lineTo(point);
        });

        pathEl.setAttribute("stroke", color);
        pathEl.setAttribute("fill", "none");
        pathEl.setAttribute("stroke-width", `${thickness}`);
        pathEl.setAttribute("d", path.getD());
      },
    },
  });
}
