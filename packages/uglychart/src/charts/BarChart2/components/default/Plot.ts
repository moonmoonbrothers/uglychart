import {
  Axis,
  Widget,
  EdgeInsets,
  Flex,
  MainAxisAlignment,
} from "@moonmoonbrothers/flutterjs";
import { Plot as CartesianChartPlot } from "../../../../common/CartesianChart/component/default";

export default function Plot({
  direction,
  BarGroups,
  BackgroundAdditions,
  ForegroundAdditions,
  width,
  height,
  backgroundColor,
  padding,
  horizontalLine,
  verticalLine,
}: PlotProps) {
  return CartesianChartPlot({
    direction,
    BackgroundAdditions,
    ForegroundAdditions,
    width,
    horizontalLine,
    backgroundColor,
    padding,
    height,
    verticalLine,
    child: Flex({
      direction: direction === "vertical" ? Axis.horizontal : Axis.vertical,
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: BarGroups,
    }),
  });
}

type PlotProps = {
  width?: number;
  height?: number;
  backgroundColor?: string;
  padding?: EdgeInsets;
  direction: "vertical" | "horizontal";
  BackgroundAdditions: Widget[];
  ForegroundAdditions: Widget[];
  BarGroups: Widget[];
  verticalLine: PlotLine;
  horizontalLine: PlotLine;
};

type PlotLine = {
  color: string;
  thickness: number;
  count: number;
};
