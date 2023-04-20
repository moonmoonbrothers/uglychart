import {
  ComponentWidget,
  Widget,
  BuildContext,
  EdgeInsets,
} from "@moonmoonbrothers/flutterjs";
import Title from "./Title";
import Chart from "./Chart";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";
import { Layout as DefaultLayout } from "./default";

export type LayoutConfig = {
  padding?: EdgeInsets;
  backgroundColor?: string;
};

const defaultLayoutConfig = {
  padding: EdgeInsets.all(30),
};

export class Layout extends ComponentWidget {
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context);
    const data = DataProvider.of(context);
    const { layout } = CustomProvider.of(context);
    if (layout.type === "custom")
      return layout.Custom({ Title, Chart }, { theme, data });

    const { padding = defaultLayoutConfig.padding, backgroundColor } = layout;

    return DefaultLayout({
      padding,
      Title: Title(),
      Chart: Chart(),
      backgroundColor,
    });
  }
}

export default () => new Layout();
