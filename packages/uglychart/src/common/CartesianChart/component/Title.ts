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

export class Title extends CartesianChartContextWidget {
  build(context: BuildContext): Widget {
    const data = this.getData(context);
    const theme = this.getTheme(context);
    const { title } = this.getCustom(context);

    const { title: text = "" } = data;
    if (title.type === "custom") {
      return title.Custom({}, { theme, data, text });
    }

    return DefaultTitle({
      align: title.alignment,
      text,
      style: new TextStyle({
        fontFamily: title.font?.fontFamily ?? theme.text.fontFamily,
        fontSize: title.font?.fontSize ?? 18,
        color: title.font?.color ?? theme.text.color,
        height: title.font?.lineHeight ?? theme.text.lineHeight,
      }),
      margin: title.margin,
    });
  }
}

export default () => new Title();
