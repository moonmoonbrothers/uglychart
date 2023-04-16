import {
  BuildContext,
  ComponentWidget,
  type Widget,
} from "@moonmoonbrothers/flutterjs";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";
import { YAxisTick as DefaultYAxisTick } from "./default";

class YAxisTick extends ComponentWidget {
  index: number;
  label: string;
  constructor({ index, label }: YAxisTickProps) {
    super();
    this.index = index;
    this.label = label;
  }
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context);
    const data = DataProvider.of(context);
    const { xAxis, xAxisTick } = CustomProvider.of(context);

    if (xAxisTick.type === "custom") {
      return xAxisTick.Custom(
        {},
        { theme, data, index: this.index, label: this.label }
      );
    }

    return DefaultYAxisTick({
      thickness: xAxisTick.thickness ?? xAxis.thickness ?? theme.border.width,
      length: xAxisTick.length ?? 10,
      color: xAxisTick.color ?? xAxis.color ?? theme.border.color,
    });
  }
}

export type YAxisTickProps = {
  index: number
  label: string
}

export default (props: YAxisTickProps) => new YAxisTick(props) 