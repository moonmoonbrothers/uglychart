import {
  Alignment,
  Container,
  Widget,
  EdgeInsets,
  MainAxisAlignment,
  Stack,
  SizedBox,
  ConstraintsTransformBox,
  Row,
  CrossAxisAlignment,
  Column,
} from "@moonmoonbrothers/flutterjs";
import { assert } from "@moonmoonbrothers/flutterjs/src/utils";

export default function Plot({
  child,
  BackgroundAdditions,
  ForegroundAdditions,
  width,
  height,
  backgroundColor,
  padding,
  horizontalLine,
  verticalLine,
}: PlotProps) {
  assert(
    horizontalLine.count === Math.round(horizontalLine.count),
    "horizontal line count must be integer"
  );
  assert(
    verticalLine.count === Math.round(verticalLine.count),
    "vertical line count must be integer"
  );

  const VerticalLines = () =>
    Row({
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        SizedBox.shrink(),
        ...Array.from(
          {
            length: verticalLine.count,
          },
          (_, index) =>
            SizedBox({
              width: 0,
              child: ConstraintsTransformBox({
                alignment:
                  index === verticalLine.count - 1
                    ? Alignment.centerRight
                    : Alignment.center,
                constraintsTransform:
                  ConstraintsTransformBox.maxWidthUnconstrained,
                child: Container({
                  color: verticalLine.color,
                  width: verticalLine.thickness,
                }),
              }),
            })
        ),
      ],
    });

  const HorizontalLines = () =>
    Column({
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        ...Array.from(
          {
            length: horizontalLine.count,
          },
          (_, index) =>
            SizedBox({
              height: 0,
              child: ConstraintsTransformBox({
                alignment: index === 0 ? Alignment.topCenter : Alignment.center,
                constraintsTransform:
                  ConstraintsTransformBox.maxHeightUnconstrained,
                child: Container({
                  color: horizontalLine.color,
                  height: horizontalLine.thickness,
                }),
              }),
            })
        ),
        SizedBox.shrink(),
      ],
    });

  return Stack({
    clipped: false,
    children: [
      ...BackgroundAdditions,
      VerticalLines(),
      HorizontalLines(),
      Container({
        padding,
        width,
        height,
        color: backgroundColor,
        child,
      }),
      ...ForegroundAdditions,
    ],
  });
}

type PlotProps = {
  width?: number;
  height?: number;
  backgroundColor?: string;
  padding?: EdgeInsets;
  direction?: "vertical" | "horizontal";
  BackgroundAdditions: Widget[];
  ForegroundAdditions: Widget[];
  child: Widget;
  verticalLine: PlotLine;
  horizontalLine: PlotLine;
};

type PlotLine = {
  color: string;
  thickness: number;
  count: number;
};
