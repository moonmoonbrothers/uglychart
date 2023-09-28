import {
  BuildContext,
  EdgeInsets,
  ToolTipPosition,
  Widget,
} from "@moonmoonbrothers/flutterjs";
import { Bar as DefaultBar } from "./default";
import CartesianChartContextWidget from "../../../common/CartesianChart/CartesianChartContextWidget";
import type { Custom, Dependencies } from "../types";

export type BarProps = {
  backgroundColor: string;
  index: number;
  value: number;
  label: string;
  legend: string;
  direction: "horizontal" | "vertical";
};

export type BarConfig = {
  thickness?: number;
};

const defaultBarConfig = {
  thickness: 16,
};

export class Bar extends CartesianChartContextWidget<Custom, Dependencies> {
  constructor(private props: BarProps) {
    super();
  }

  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { bar } = this.getCustom(context);
    const { Tooltip } = this.getDependencies(context);

    const { backgroundColor, index, label, legend, direction } = this.props;

    if (bar.type === "custom") {
      return bar.Custom(
        {},
        {
          backgroundColor,
          index,
          theme,
          label,
          legend,
          data,
          direction,
        }
      );
    }

    const { thickness = defaultBarConfig.thickness } = bar;
    const { value } = this.props;

    return Tooltip({
      label,
      value,
      legend: {
        name: legend,
        color: backgroundColor,
      },
      margin: EdgeInsets.symmetric({ horizontal: 5 }),
      position: ToolTipPosition.topRight,
      child: DefaultBar({
        color: backgroundColor,
        direction,
        thickness,
      }),
    });
  }
}

export default (props: BarProps) => new Bar(props);
