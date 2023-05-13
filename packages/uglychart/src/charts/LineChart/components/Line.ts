import { Widget } from "@moonmoonbrothers/flutterjs";
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget";
import { Line as DefaultLine } from "./default";
import CartesianChartContextWidget from "../../../common/CartesianChart/CartesianChartContextWidget";
import type { Custom } from "../types";

export type LineProps = {
  index: number;
  color: string;
};

export type LineConfig = {
  thickness?: number;
};

const defaultLineConfig = {
  thickness: 2,
};

export class Line extends CartesianChartContextWidget<Custom> {
  constructor(private props: LineProps) {
    super();
  }

  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { line } = this.getCustom(context);
    const { color, index } = this.props;

    if (line.type === "custom") {
      return line.Custom(
        {},
        {
          color,
          theme,
          data,
          index,
        }
      );
    }

    const { thickness = defaultLineConfig.thickness } = line;

    return DefaultLine({
      thickness,
      color,
      points: [],
    });
  }
}

export default (props: LineProps) => new Line(props);
