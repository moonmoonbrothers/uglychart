import { Custom, Theme, Data, Dependencies } from "./types";
import ChartContextRootWidget from "../ChartContextRootWidget";
import {
  Chart,
  Layout,
  Plot,
  Title,
  YAxis,
  XAxis,
  XAxisLabel,
  XAxisTick,
  YAxisLabel,
  YAxisTick,
  DataLabel,
} from "./component";

class CartesianChartContextRootWidget<
  CUSTOM extends Custom = Custom,
  DEPENDENCIES extends Dependencies = Dependencies,
  THEME extends Theme = Theme,
  DATA extends Data = Data
> extends ChartContextRootWidget<CUSTOM, DEPENDENCIES, THEME, DATA> {
  get dependencies(): DEPENDENCIES {
    return {
      Chart,
      Layout,
      Plot,
      Title,
      XAxis,
      XAxisLabel,
      XAxisTick,
      YAxis,
      YAxisLabel,
      YAxisTick,
      DataLabel,
    } as DEPENDENCIES;
  }
}

export default CartesianChartContextRootWidget;
