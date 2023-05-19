import { Custom, Theme, Data, Dependencies } from "./types";
import ChartContextWidget from "../ChartContextWidget";
import { Scale } from "./util";

class CartesianChartContextWidget<
  CUSTOM extends Custom = Custom,
  DEPENDENCIES extends Dependencies = Dependencies,
  THEME extends Theme = Theme,
  DATA = Data,
  SCALE = Scale
> extends ChartContextWidget<CUSTOM, DEPENDENCIES, THEME, DATA, SCALE> {}

export default CartesianChartContextWidget;
