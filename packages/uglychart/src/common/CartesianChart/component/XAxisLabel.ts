import {
  TextAlign,
  TextStyle,
  TextWidthBasis,
  Widget,
} from "@moonmoonbrothers/flutterjs";
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget";
import { XAxisLabel as DefaultXAxisLabel } from "./default";
import CartesianChartContextWidget from "../CartesianChartContextWidget";

export type XAxisLabelProps = {
  index: number;
  text: string;
};

export class XAxisLabel extends CartesianChartContextWidget{
  constructor(private props: XAxisLabelProps) {
    super();
  }
  build(context: BuildContext): Widget {
    const data = this.getData(context);
    const theme = this.getTheme(context);
    const { xAxisLabel } = this.getCustom(context);

    const { text, index } = this.props;
    if (xAxisLabel.type === "custom") {
      return xAxisLabel.Custom({}, { theme, text, index, data });
    }
    const { font, margin } = xAxisLabel;

    return DefaultXAxisLabel({
      text,
      textWidthBasis: TextWidthBasis.longestLine,
      textAlign: TextAlign.center,
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

export default (props: XAxisLabelProps) => new XAxisLabel(props);
