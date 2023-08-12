import { Alignment, Widget, BuildContext } from "@moonmoonbrothers/flutterjs";
import CartesianChartContextWidget from "../../../common/CartesianChart/CartesianChartContextWidget";
import { Scale } from "../../../common/CartesianChart/util";
import { Chart as DefaultChart } from "./default";
import { Custom } from "../types";
import { Chart as CartesianChart } from "../../../common/CartesianChart/component/Chart";

export type ChartConfig = {
  scale?: Scale;
  direction?: "horizontal" | "vertical";
  alignment?: Alignment;
  foregroundAdditions?: Widget[];
  backgroundAdditions?: Widget[];
};

export class Chart extends CartesianChart<Custom> {
  getDirection(context: BuildContext): "horizontal" | "vertical" {
    const { chart } = this.getCustom(context);
    if (chart.type === "config") {
      return chart.direction ?? "vertical";
    }
    return "vertical";
  }
}

export default () => new Chart();
