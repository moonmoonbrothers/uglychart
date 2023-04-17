import {
  Alignment,
  Column,
  ComponentWidget,
  Container,
  Flexible,
  Widget,
  BuildContext,
  EdgeInsets,
} from "@moonmoonbrothers/flutterjs";
import Title from "./Title";
import Chart from "./Chart";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";

export type LayoutConfig = {
  padding?: EdgeInsets;
  backgroundColor?: string;
};

class Layout extends ComponentWidget {
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context);
    const data = DataProvider.of(context);
    const { layout } = CustomProvider.of(context);
    if (layout.type === "custom")
      return layout.Custom({ Title, Chart }, { theme, data });

    const { padding, backgroundColor } = layout;
    return Container({
      width: Infinity,
      height: Infinity,
      padding,
      color: backgroundColor,
      alignment: Alignment.topLeft,
      child: Column({
        children: [
          Title(),
          Flexible({
            child: Chart(),
          }),
        ],
      }),
    });
  }
}

export default () => new Layout();
