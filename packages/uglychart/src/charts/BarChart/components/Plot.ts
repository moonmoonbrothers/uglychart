import { Widget, BuildContext, Container } from "@moonmoonbrothers/flutterjs";
import { Plot as DefaultPlot } from "./default";
import { assert } from "@moonmoonbrothers/flutterjs/src/utils";
import { Plot as BasePlot } from "../../../common/CartesianChart/component/Plot";

type PlotLine = {
  color?: string;
  thickness?: number;
  count?: number;
};

const defaultPlotConfig = {
  verticalLine: {
    color: "#D3D3D3",
  },
  horizontalLine: {
    color: "#D3D3D3",
  },
};

export class Plot extends BasePlot {
  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { plot } = this.getCustom(context);
    if (plot.type === "custom") {
      return plot.Custom({}, { data, theme });
    }
    const { Series } = this.getDependencies(context);

    const {
      height,
      width,
      horizontalLine,
      verticalLine,
      backgroundAdditions = [],
      foregroundAdditions = [],
    } = plot;
    const { labels } = data;
    const { direction } = this.props;
    const scale = this.getScale(context);

    const [labelLineCount, valueLineCount] = [
      labels.length,
      (scale.max - scale.min) / scale.step,
    ];

    assert(
      valueLineCount === Math.round(valueLineCount),
      "scale.max - scale.min must be divisible by scale.step"
    );

    return DefaultPlot({
      direction: direction,
      height: height,
      width: width,
      verticalLine: {
        thickness: verticalLine?.thickness ?? theme.border.width,
        color: verticalLine?.color ?? defaultPlotConfig.verticalLine.color,
        count: direction === "horizontal" ? valueLineCount : labelLineCount,
      },
      horizontalLine: {
        thickness: horizontalLine?.thickness ?? theme.border.width,
        color: horizontalLine?.color ?? defaultPlotConfig.horizontalLine.color,
        count: direction === "vertical" ? valueLineCount : labelLineCount,
      },
      BackgroundAdditions: foregroundAdditions,
      ForegroundAdditions: backgroundAdditions,
      child: Series({
        direction,
      }),
    });
  }
}

export default (...props: ConstructorParameters<typeof Plot>) =>
  new Plot(...props);
