import {
  CustomPaint,
  Offset,
  Path,
  Size,
  Text,
} from "@moonmoonbrothers/flutterjs";
export default function Line({
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
        if (spline) {
          drawSpline(points, path);
        } else {
          drawLine(points, path);
        }

        pathEl.setAttribute("stroke", color);
        pathEl.setAttribute("fill", "none");
        pathEl.setAttribute("stroke-width", `${thickness}`);
        pathEl.setAttribute("d", path.getD());
      },
    },
  });
}

function drawLine(points: { x: number; y: number }[], path: Path) {
  points.forEach((point, i) => {
    if (i === 0) {
      path.moveTo(point);
      return;
    }

    path.lineTo(point);
  });
}

function drawSpline(data: { x: number; y: number }[], path: Path) {
  path.moveTo({ x: data[0].x, y: data[0].y });
  for (let i = 1; i < data.length; i++) {
    path.cubicTo({
      startControlPoint: {
        x: data[i - 1].x + (data[i].x - data[i - 1].x) / 2,
        y: data[i - 1].y,
      },
      endControlPoint: {
        x: data[i - 1].x + (data[i].x - data[i - 1].x) / 2,
        y: data[i].y,
      },
      endPoint: {
        x: data[i].x,
        y: data[i].y,
      },
    });
  }
}
