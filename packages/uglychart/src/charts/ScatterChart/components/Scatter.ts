import { Widget } from "@moonmoonbrothers/flutterjs";
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget";
import { Scatter as DefaultScatter } from "./default";
import type { Custom, Dependencies, Data, Theme, Scale } from "../types";
import ChartContextWidget from "../../../common/ChartContextWidget";

export type ScatterProps = {
  color: string;
  points: { x: number; y: number }[];
};

export type ScatterConfig = {
  dotRadius?: number;
};

const defaultScatterConfig = {
  dotRadius: 5,
};

export class Scatter extends ChartContextWidget<
  Custom,
  Dependencies,
  Theme,
  Data,
  Scale
> {
  constructor(private props: ScatterProps) {
    super();
  }

  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { scatter } = this.getCustom(context);
    const scale = this.getScale(context);
    const { color, points } = this.props;

    if (scatter.type === "custom") {
      return scatter.Custom(
        {},
        {
          scale,
          ...this.props,
          theme,
          data,
        }
      );
    }

    const { dotRadius = defaultScatterConfig.dotRadius } = scatter;

    return DefaultScatter({
      color,
      dotRadius,
      points,
      scale,
    });
  }
}

export default (props: ScatterProps) => new Scatter(props);
