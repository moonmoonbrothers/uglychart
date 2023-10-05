import { BuildContext, EdgeInsets, Widget } from "@moonmoonbrothers/flutterjs";
import { Tooltip as DefaultTooltip } from "./default";
import CartesianChartContextWidget from "../../../common/CartesianChart/CartesianChartContextWidget";
import type { Custom } from "../types";
import { functionalizeClass } from "@moonmoonbrothers/flutterjs/src/utils";

export type TooltipProps = {
  value: number;
  label: string;
  legend: {
    name: string;
    color: string;
  };
  margin: EdgeInsets;
};

export type TooltipConfig = {
  margin?: EdgeInsets;
};

export class Tooltip extends CartesianChartContextWidget<Custom> {
  constructor(protected props: TooltipProps) {
    super();
  }
  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { tooltip } = this.getCustom(context);
    if (tooltip.type === "custom") {
      return tooltip.Custom({}, { data, theme });
    }
    const { margin = EdgeInsets.all(0) } = tooltip;
    return DefaultTooltip({
      ...this.props,
      margin: this.props.margin.plus(margin),
      fontFamily: theme.text.fontFamily,
    });
  }
}

export default functionalizeClass(Tooltip);
