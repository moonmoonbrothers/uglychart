import { CustomPaint, Path, Size } from "@moonmoonbrothers/flutterjs";
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
        const path = new Path();
        drawLine(path, {
          width,
          height,
          maxValue,
          minValue,
          values,
          spline,
        });

        pathEl.setAttribute("stroke", color);
        pathEl.setAttribute("fill", "none");
        pathEl.setAttribute("stroke-width", `${thickness}`);
        pathEl.setAttribute("d", path.getD());
      },
    },
  });
}

type BezierPoint = Point & { controlPoint: { prev: Point; next: Point } };
type Point = { x: number; y: number };

export function drawLine(
  path: Path,
  {
    width,
    height,
    spline,
    values,
    maxValue,
    minValue,
  }: {
    width: number;
    height: number;
    spline: boolean;
    values: number[];
    minValue: number;
    maxValue: number;
  }
) {
  const count = values.length;
  const points = values.map((value, i) => {
    const x = (i / (count - 1)) * width;
    const y = height - ((value - minValue) / (maxValue - minValue)) * height;
    return {
      x,
      y,
    };
  });
  if (spline) {
    drawSplineLine(points, path);
  } else {
    drawStraightLine(points, path);
  }
}

function drawStraightLine(points: Point[], path: Path) {
  points.forEach((point, i) => {
    if (i === 0) {
      path.moveTo(point);
      return;
    }

    path.lineTo(point);
  });
}

function drawSplineLine(points: Point[], path: Path) {
  const bezierPoints = points as BezierPoint[];
  setSplineControlPoint(bezierPoints);
  bezierPoints.forEach((point, idx) => {
    if (idx === 0) {
      path.moveTo(point);
      return;
    }

    if (point.controlPoint && bezierPoints[idx - 1]?.controlPoint?.next) {
      const { x: prevX, y: prevY } = bezierPoints[idx - 1]!.controlPoint!.next;
      const { controlPoint, x, y } = point;

      path.cubicTo({
        startControlPoint: {
          x: prevX,
          y: prevY,
        },
        endControlPoint: {
          x: controlPoint.prev.x,
          y: controlPoint.prev.y,
        },
        endPoint: {
          x,
          y,
        },
      });
    }
  });
}

function setSplineControlPoint(points: (BezierPoint | null)[]) {
  for (
    let i = 0, pointsSize = points.length, prev = points[0];
    i < pointsSize;
    i += 1
  ) {
    const point = points[i];
    if (point == null) {
      prev = points[i + 1];
      continue;
    }

    const next = points[Math.min(i + 1, pointsSize - 1) % pointsSize];
    if (prev && next) {
      point.controlPoint = getControlPoints(prev, point, next);
    }

    prev = point;
  }
}

function getControlPoints(
  prev: BezierPoint,
  cur: BezierPoint,
  next: BezierPoint
) {
  // http://scaledinnovation.com/analytics/splines/aboutSplines.html
  const TENSION = 0.333;
  const { x: x0, y: y0 } = prev;
  const { x: x1, y: y1 } = cur;
  const { x: x2, y: y2 } = next;

  const d12 = getDistance(next, cur);
  const d01 = getDistance(cur, prev);

  const fa = (TENSION * d01) / (d01 + d12) || 0; // scaling factor for triangle Ta
  const fb = (TENSION * d12) / (d01 + d12) || 0; // ditto for Tb, simplifies to fb=t-fa

  return {
    prev: {
      x: x1 - fa * (x2 - x0), // x2-x0 is the width of triangle T
      y: y1 - fa * (y2 - y0), // y2-y0 is the height of T
    },
    next: { x: x1 + fb * (x2 - x0), y: y1 + fb * (y2 - y0) },
  };
}

function getDistance(point1: Point, point2: Point) {
  return Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
}
