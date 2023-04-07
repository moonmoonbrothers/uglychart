import {
  Alignment,
  ComponentWidget,
  Container,
  EdgeInsets,
  Padding,
  Text,
  TextOverflow,
  TextStyle,
  Widget,
} from "@moonmoonbrothers/flutterjs";
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";

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

    return Padding({
      padding: margin,
      child: Container({
        height: 0,
        padding: EdgeInsets.only({ top: 1 }),
        alignment: Alignment.center,
        child: Text(text, {
          overflow: TextOverflow.visible,
          style: new TextStyle({
            fontFamily: font?.fontFamily ?? theme.text.fontFamily,
            fontSize: font?.fontSize ?? theme.text.fontSize,
            color: font?.color ?? theme.text.color,
          }),
        }),
      }),
    });
  }
}

export default (props: YAxisLabelProps) => new YAxisLabel(props);
