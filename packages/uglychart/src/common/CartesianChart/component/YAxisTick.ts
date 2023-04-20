import {
  BuildContext,
  ComponentWidget,
  type Widget,
} from "@moonmoonbrothers/flutterjs";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";
import { YAxisTick as DefaultYAxisTick } from "./default";

export class YAxisTick extends ComponentWidget {
  index: number;
  constructor({ index }: YAxisTickProps) {
    super();
    this.index = index;
  }
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context);
    const data = DataProvider.of(context);
    const { yAxis, yAxisTick } = CustomProvider.of(context);

    if (yAxisTick.type === "custom") {
      return yAxisTick.Custom({}, { theme, data, index: this.index });
    }

    return DefaultYAxisTick({
      thickness: yAxisTick.thickness ?? yAxis.thickness ?? theme.border.width,
      length: yAxisTick.length ?? 10,
      color: yAxisTick.color ?? yAxis.color ?? theme.border.color,
    });
  }
}

export type YAxisTickProps = {
  index: number;
};

export default (props: YAxisTickProps) => new YAxisTick(props);
