import { CartesianChartProps } from "./types";
import Layout from "./component/Layout";
import {
  ComponentWidget,
  Widget,
  BuildContext,
  Provider,
} from "@moonmoonbrothers/flutterjs";
import { Custom, Data, Theme } from "./types";
import * as defaultComponents from "./component/default";

class CartesianChart extends ComponentWidget {
  custom: Required<Custom>;
  data: Data;
  theme: Theme;

  constructor({
    custom: {
      layout = { type: "config" as const },
      title = { type: "config" as const },
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
        lineHeight = 1,
      } = {},
      border: { width: borderWidth = 2, color: borderColor = "black" } = {},
    } = {},
  }: CartesianChartProps) {
    super();

    this.custom = {
      layout,
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
    return Provider({
      providerKey: "THEME",
      value: {
        theme: this.theme,
      },
      child: Provider({
        providerKey: "DATA",
        value: {
          data: this.data,
        },
        child: Provider({
          providerKey: "CUSTOM",
          value: {
            custom: this.custom,
          },
          child: Layout(),
        }),
      }),
    });
  }
}

export default (props: CartesianChartProps) => new CartesianChart(props);
export { defaultComponents as DefaultComponents };
