import {
  Alignment,
  Container,
  Grid,
  Stack,
  Widget,
  BoxDecoration,
  Border,
  BorderSide,
  IntrinsicWidth,
  IntrinsicHeight,
} from "@moonmoonbrothers/flutterjs";

export default function Chart({
  yAxisColor,
  yAxisThickness,
  xAxisColor,
  xAxisThickness,
  XAxis,
  YAxis,
  Plot,
  BackgroundAdditions,
  ForegroundAdditions,
  width,
  height,
}: ChartProps) {
  return Stack({
    children: [
      ...BackgroundAdditions,
      Grid({
        childrenByRow: [
          [YAxis, Plot],
          [
            Edge({ xAxisColor, xAxisThickness, yAxisColor, yAxisThickness }),
            XAxis,
          ],
        ],
        templateColumns: [Grid.ContentFit(), Grid.ContentFit()],
        templateRows: [Grid.Fr(1), Grid.ContentFit()],
      }),
      ...ForegroundAdditions,
    ],
  });
}
type ChartProps = {
  yAxisColor: string;
  yAxisThickness: number;
  xAxisColor: string;
  xAxisThickness: number;
  Plot: Widget;
  YAxis: Widget;
  XAxis: Widget;
  BackgroundAdditions: Widget[];
  ForegroundAdditions: Widget[];
  width?: number;
  height?: number;
};

function Edge({
  yAxisColor,
  xAxisColor,
  xAxisThickness,
  yAxisThickness,
}: {
  yAxisColor: string;
  yAxisThickness: number;
  xAxisColor: string;
  xAxisThickness: number;
}) {
  return Container({
    alignment: Alignment.topRight,
    child: Container({
      width: yAxisThickness,
      height: xAxisThickness,
      decoration: new BoxDecoration({
        border: new Border({
          left: new BorderSide({
            color: yAxisColor,
            width: yAxisThickness,
          }),
          bottom: new BorderSide({
            color: xAxisColor,
            width: xAxisThickness,
          }),
        }),
      }),
    }),
  });
}

function IntrinsicSize({ child }: { child: Widget }) {
  return IntrinsicWidth({
    child: IntrinsicHeight({
      child,
    }),
  });
}
