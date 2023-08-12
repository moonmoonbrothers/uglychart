import { Widget, SizedBox, BuildContext } from "@moonmoonbrothers/flutterjs";
import { getStackValueEdge } from "./util/getStackValueEdge";
import { Scale, getScale } from "../../common/CartesianChart/util";
import { BarChart } from "../BarChart/";

export class StackedBarChart extends BarChart {
  get scale(): Scale {
    const { datasets } = this.data;
    const valueEdge = getStackValueEdge(datasets.map(({ data }) => data));

    const roughEdge = {
      min: valueEdge.min > 0 ? 0 : valueEdge.min,
      max: valueEdge.max < 0 ? 0 : valueEdge.max,
    };
    const roughStepCount = 10; /* chart size에 따라 보정 필요!*/

    const roughScale: Scale = {
      min: roughEdge.min,
      max: roughEdge.max,
      step: (roughEdge.max - roughEdge.min) / roughStepCount,
    };

    return getScale(roughScale);
  }
}

export default (...props: ConstructorParameters<typeof StackedBarChart>) =>
  new StackedBarChart(...props);
