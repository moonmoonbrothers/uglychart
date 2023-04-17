import {
  ComponentWidget,
  Container,
  Text,
  TextStyle,
  Widget,
  BuildContext,
  ConstraintsTransformBox,
  Constraints,
  Padding,
} from "@moonmoonbrothers/flutterjs";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";
import { YAxisLabel as DefaultYAxisLabel } from "./default";

export type YAxisLabelProps = {
  index: number;
  text: string;
};

class YAxisLabel extends ComponentWidget {
  constructor(private props: YAxisLabelProps) {
    super();
  }
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context);
    const data = DataProvider.of(context);
    const { yAxisLabel } = CustomProvider.of(context);

    const { text, index } = this.props;
    if (yAxisLabel.type === "custom") {
      return yAxisLabel.Custom({}, { theme, text, index, data });
    }
    const { font, margin } = yAxisLabel;

    return DefaultYAxisLabel({
      text,
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
