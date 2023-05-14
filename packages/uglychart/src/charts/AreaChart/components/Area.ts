import { Widget } from "@moonmoonbrothers/flutterjs";
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget";
import { Area as DefaultArea } from "./default";
import CartesianChartContextWidget from "../../../common/CartesianChart/CartesianChartContextWidget";
import type { Custom } from "../types";

export type AreaProps = {
  color: string;
  values: number[];
  minValue: number;
  maxValue: number;
};

export type AreaConfig = {
  thickness?: number;
};

const AreaConfig = {
  thickness: 2,
};

export class Area extends CartesianChartContextWidget<Custom> {
  constructor(private props: AreaProps) {
    super();
  }

  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { area: line } = this.getCustom(context);
    const {
      color,
      values: values,
      maxValue: maxValue,
      minValue: minValue,
    } = this.props;

    if (line.type === "custom") {
      return line.Custom(
        {},
        {
          color,
          theme,
          data,
          points: values,
          minPoint: minValue,
          maxPoint: maxValue,
        }
      );
    }

    const { thickness = AreaConfig.thickness } = line;

    return DefaultArea({
      thickness,
      color,
      values,
      minValue,
      maxValue,
    });
  }
}

export default (props: AreaProps) => new Area(props);
