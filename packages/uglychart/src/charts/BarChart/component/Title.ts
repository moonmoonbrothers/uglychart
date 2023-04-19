import {
  ComponentWidget,
  Padding,
  Row,
  Text,
  TextStyle,
  Widget,
  BuildContext,
  EdgeInsets,
  MainAxisAlignment,
} from "@moonmoonbrothers/flutterjs";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";
import { Font } from "../types";
import { Title as DefaultTitle } from "./default";

export type TitleConfig = {
  margin?: EdgeInsets;
  alignment?: "start" | "end" | "center";
  font?: Font;
};

const defaultTitleConfig = {
  font: {
    fontSize: 24,
  },
  alignment: "start" as const,
};

class Title extends ComponentWidget {
  build(context: BuildContext): Widget {
    const data = DataProvider.of(context);
    const theme = ThemeProvider.of(context);
    const { title } = CustomProvider.of(context);

    const { title: text = "" } = data;
    if (title.type === "custom") {
      return title.Custom({}, { theme, data, text });
    }

    const { alignment, font, margin } = title;

    return DefaultTitle({
      align: alignment,
      text,
      style: new TextStyle({
        fontFamily: font?.fontFamily ?? theme.text.fontFamily,
        fontSize: font?.fontSize ?? defaultTitleConfig.font.fontSize,
        color: font?.color ?? theme.text.color,
        height: font?.lineHeight ?? theme.text.lineHeight,
      }),
      margin,
    });
  }
}

export default () => new Title();
