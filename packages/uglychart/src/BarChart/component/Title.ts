import {
  ComponentWidget,
  Padding,
  Row,
  Text,
  TextStyle,
  Widget,
} from "@moonmoonbrothers/flutterjs";
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";

class Title extends ComponentWidget {
  build(context: BuildContext): Widget {
    const data = DataProvider.of(context);
    const theme = ThemeProvider.of(context);
    const { title } = CustomProvider.of(context);

    const { title: text = "" } = data;
    if (title.type === "custom") {
      return title.Custom({}, { theme, data, text });
    }

    const { alignment, font = theme.text, margin } = title;
    return Row({
      mainAxisAlignment: alignment === "center" ? "spaceEvenly" : alignment,
      children: [
        Padding({
          padding: margin,
          child: Text(text, {
            style: new TextStyle({
              color: font.color,
              fontFamily: font.fontFamily,
              fontSize: font.fontSize,
            }),
          }),
        }),
      ],
    });
  }
}

export default () => new Title();
