import { Widget, BuildContext, EdgeInsets } from "@moonmoonbrothers/flutterjs";
import { Layout as DefaultLayout } from "./default";
import CartesianChartContextWidget from "../CartesianChartContextWidget";

export type LayoutConfig = {
  padding?: EdgeInsets;
  backgroundColor?: string;
};

export class Layout extends CartesianChartContextWidget {
  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { layout } = this.getCustom(context);
    const { Title, Chart } = this.getDependencies(context);
    if (layout.type === "custom")
      return layout.Custom({ Title, Chart }, { theme, data });

    const { padding, backgroundColor } = layout;

    return DefaultLayout({
      padding,
      Title: Title(),
      Chart: Chart(),
      backgroundColor,
    });
  }
}

export default () => new Layout();
