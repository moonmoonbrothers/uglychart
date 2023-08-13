import {
  Widget,
  BuildContext,
  EdgeInsets,
  ChangeNotifierProvider,
  ReactiveChangeNotifier,
} from "@moonmoonbrothers/flutterjs";
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
    const { Title, Chart, Legend } = this.getDependencies(context);
    if (layout.type === "custom")
      return layout.Custom({ Title, Chart }, { theme, data });

    const { padding, backgroundColor } = layout;

    const legendStates = [
      ...new Set(data.datasets.map(({ legend }) => legend)),
    ].map((label, i) => ({
      label,
      visible: true,
      color: theme.series.colors[i % theme.series.colors.length],
    }));

    return ChangeNotifierProvider({
      providerKey: "LEGEND_STATES",
      create: () => ReactiveChangeNotifier({ legendStates }),
      child: DefaultLayout({
        padding,
        Title: Title(),
        Chart: Chart(),
        backgroundColor,
        Legend: Legend(),
      }),
    });
  }
}

export default () => new Layout();
