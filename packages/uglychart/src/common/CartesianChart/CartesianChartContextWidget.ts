import { Custom, Theme, Data, Dependencies } from "./types";
import ChartContextWidget from "../ChartContextWidget";

class CartesianChartContextWidget<
  CUSTOM extends Custom = Custom,
  DEPENDENCIES extends Dependencies = Dependencies,
  THEME extends Theme = Theme,
  DATA extends Data = Data
> extends ChartContextWidget<CUSTOM, DEPENDENCIES, THEME, DATA> {}

export default CartesianChartContextWidget;
