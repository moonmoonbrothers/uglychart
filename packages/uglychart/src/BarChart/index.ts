import { ThemeProvider, DataProvider, CustomProvider } from "./provider";
import { BarChartProps, Font } from "./types";
import Layout from "./component/Layout";
import {
  ComponentWidget,
  Widget,
  BuildContext,
} from "@moonmoonbrothers/flutterjs";
import { Custom, Data, Theme } from "./types";

class BarChart extends ComponentWidget {
  custom: Required<Custom>;
  data: Data;
  theme: Theme

  constructor({
    custom: {
      layout = { type: "config" as const },
      title = { type: "config" as const },
      bar = { type: "config" as const },
      barGroup = {
        type: "config" as const,
      },
      xAxis = { type: "config" as const },
      yAxis = {
        type: "config" as const,
      },
      xAxisLabel = {
        type: "config" as const,
        font: {},
      },
      yAxisLabel = {
        type: "config" as const,
      },
      plot = { type: "config" as const },
      chart = { type: "config" as const },
      dataLabel = { type: "config" as const },
      xAxisTick = { type: "config" as const },
      yAxisTick = { type: "config" as const },
    } = {},
    data,
    theme: {
      text: {
        color = "black",
        fontFamily = "Noto Sans KR, sans-serif",
        fontSize = 16,
        lineHeight = 1.2,
      } = {},
      border: { width: borderWidth = 2, color: borderColor = "black" } = {},
    } = {},
  }: BarChartProps) {
    super();

    this.custom = {
      layout,
      bar,
      barGroup,
      xAxis,
      yAxis,
      xAxisLabel,
      yAxisLabel,
      plot,
      chart,
      dataLabel,
      title,
      xAxisTick,
      yAxisTick,
    };

    this.data = data;

    this.theme = {
      border: {
        width: borderWidth,
        color: borderColor,
      },
      text: {
        fontSize,
        color,
        fontFamily,
        lineHeight,
      },
    };
  }

  override build(context: BuildContext): Widget {
    return ThemeProvider({
      theme: this.theme,
      child: DataProvider({
        data: this.data,
        child: CustomProvider({
          custom: this.custom,
          child: Layout(),
        }),
      }),
    });
  }
}

export default (props: BarChartProps) => new BarChart(props);
