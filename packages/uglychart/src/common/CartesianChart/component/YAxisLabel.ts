import {
  TextStyle,
  Widget,
  BuildContext,
  TextAlign,
  TextWidthBasis,
} from "@moonmoonbrothers/flutterjs";
import { YAxisLabel as DefaultYAxisLabel } from "./default";
import CartesianChartContextWidget from "../CartesianChartContextWidget";

export type YAxisLabelProps = {
  index: number;
  text: string;
};

export class YAxisLabel extends CartesianChartContextWidget {
  constructor(private props: YAxisLabelProps) {
    super();
  }
  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { yAxisLabel } = this.getCustom(context);

    const { text, index } = this.props;
    if (yAxisLabel.type === "custom") {
      return yAxisLabel.Custom({}, { theme, text, index, data });
    }
    const { font, margin } = yAxisLabel;

    return DefaultYAxisLabel({
      text,
      textAlign: TextAlign.center,
      textWidthBasis: TextWidthBasis.longestLine,
      style: new TextStyle({
        fontFamily: font?.fontFamily ?? theme.text.fontFamily,
        fontSize: font?.fontSize ?? theme.text.fontSize,
        color: font?.color ?? theme.text.color,
        height: font?.lineHeight ?? theme.text.lineHeight,
      }),
      margin,
    });
  }
}

export default (props: YAxisLabelProps) => new YAxisLabel(props);
