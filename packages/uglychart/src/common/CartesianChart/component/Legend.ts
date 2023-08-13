import {
  Widget,
  BuildContext,
  TextStyle,
  Provider,
} from "@moonmoonbrothers/flutterjs";
import { Legend as DefaultLegend } from "./default";
import CartesianChartContextWidget from "../CartesianChartContextWidget";
import { funcionalizeClass } from "../../../utils";
import { LegendState } from "../types";

export type LegendConfig = {};

export type LegendProps = {};

export class Legend extends CartesianChartContextWidget {
  constructor(protected props: LegendProps = {}) {
    super();
  }

  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { legend } = this.getCustom(context);
    const { legendStates } = Provider.of<{ legendStates: LegendState[] }>(
      "LEGEND_STATES",
      context
    );

    if (legend.type === "custom") {
      return legend.Custom({}, { theme, data, legendStates });
    }

    return DefaultLegend({
      legendStates,
      style: new TextStyle({
        fontFamily: theme.text.fontFamily,
        fontSize: theme.text?.fontSize,
        color: theme.text.color,
        height: theme.text.lineHeight,
      }),
    });
  }
}

export default funcionalizeClass(Legend);
