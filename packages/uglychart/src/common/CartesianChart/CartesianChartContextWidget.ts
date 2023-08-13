import { Custom, Theme, Data, Dependencies, LegendState } from "./types";
import ChartContextWidget from "../ChartContextWidget";
import { Scale } from "./util";
import { BuildContext, Provider } from "@moonmoonbrothers/flutterjs";

class CartesianChartContextWidget<
  CUSTOM extends Custom<any, any> = Custom,
  DEPENDENCIES extends Record<
    string,
    (...arg: any) => ChartContextWidget<any, any, any, any, any>
  > = Dependencies,
  THEME extends Theme = Theme,
  DATA extends Omit<Data<any>, "labels"> = Data,
  SCALE = Scale
> extends ChartContextWidget<CUSTOM, DEPENDENCIES, THEME, DATA, SCALE> {
  getLegendState(context: BuildContext) {
    const { legendStates } = Provider.of<{ legendStates: LegendState[] }>(
      "LEGEND_STATES",
      context
    );
    return legendStates;
  }

  getVisibleDatasets(context: BuildContext) {
    const legendStates = this.getLegendState(context);
    const { datasets } = this.getData(context);
    return datasets
      .map((dataset) => {
        const state = legendStates.find(
          (state) => state.label === dataset.legend
        )!;
        return {
          ...dataset,
          color: state.color,
          visible: state.visible,
        };
      })
      .filter((value) => value.visible);
  }
}

export default CartesianChartContextWidget;
