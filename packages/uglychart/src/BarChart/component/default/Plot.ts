import {
  Alignment,
  Container,
  Axis,
  ConstraintsTransformBox,
  Widget,
  EdgeInsets,
  Flex,
  MainAxisAlignment,
  Stack,
} from "@moonmoonbrothers/flutterjs";

export default function Plot({
  direction,
  BarGroups,
  BackgroundAdditions,
  ForegroundAdditions,
  width,
  height,
  backgroundColor,
  padding,
}: PlotProps) {
  return Stack({
    clipped: false,
    children: [
      ...BackgroundAdditions,
      Container({
        padding,
        width,
        height,
        color: backgroundColor,
        alignment: Alignment.topLeft,
        child: Flex({
          direction: direction === "vertical" ? Axis.horizontal : Axis.vertical,
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: BarGroups,
        }),
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
  direction: "vertical" | "horizontal";
  BackgroundAdditions: Widget[];
  ForegroundAdditions: Widget[];
  BarGroups: Widget[];
};
