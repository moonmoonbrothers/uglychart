import {
  TextStyle,
  Widget,
  BuildContext,
  EdgeInsets,
} from "@moonmoonbrothers/flutterjs";
import { Font } from "../types";
import { Title as DefaultTitle } from "./default";
import CartesianChartContextWidget from "../CartesianChartContextWidget";

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

export class Title extends CartesianChartContextWidget {
  build(context: BuildContext): Widget {
    const data = this.getData(context);
    const theme = this.getTheme(context);
    const { title } = this.getCustom(context);

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
