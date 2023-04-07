import {
  ComponentWidget,
  Container,
  Padding,
  Text,
  TextAlign,
  TextOverflow,
  TextStyle,
  Widget,
} from "@moonmoonbrothers/flutterjs";
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";

export type XAxisLabelProps = {
  index: number;
  text: string;
};

class XAxisLabel extends ComponentWidget {
  constructor(private props: XAxisLabelProps) {
    super();
  }
  build(context: BuildContext): Widget {
    const data = DataProvider.of(context);
    const theme = ThemeProvider.of(context);
    const { xAxisLabel } = CustomProvider.of(context);

    const { text, index } = this.props;
    if (xAxisLabel.type === "custom") {
      return xAxisLabel.Custom({}, { theme, text, index, data });
    }
    const { font, margin } = xAxisLabel;

    return Container({
      width: 0,
      child: Text(text, {
        overflow: TextOverflow.visible,
        style: new TextStyle({
          fontFamily: font?.fontFamily ?? theme.text.fontFamily,
          fontSize: font?.fontSize ?? theme.text.fontSize,
          color: font?.color ?? theme.text.color,
        }),
      }),
    });
  }
}

export default (props: XAxisLabelProps) => new XAxisLabel(props);
