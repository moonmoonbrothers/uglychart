import { Custom, Theme, Data, Dependencies } from "./types";
import ChartContextWidget from "../ChartContextWidget";
import { Scale } from "./util";
import { Widget } from "@moonmoonbrothers/flutterjs";

class CartesianChartContextWidget<
  CUSTOM extends Custom<any, any> = Custom,
  DEPENDENCIES extends Record<
    string,
    (...arg: any) => ChartContextWidget<any, any, any, any, any>
  > = Dependencies,
  THEME extends Theme = Theme,
  DATA = Data,
  SCALE = Scale
> extends ChartContextWidget<CUSTOM, DEPENDENCIES, THEME, DATA, SCALE> {}

export default CartesianChartContextWidget;
