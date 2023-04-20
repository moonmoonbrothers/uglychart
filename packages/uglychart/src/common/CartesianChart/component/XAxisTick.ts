import {
  BuildContext,
  ComponentWidget,
  type Widget,
} from "@moonmoonbrothers/flutterjs";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";
import { XAxisTick as DefaultXAxisTick } from "./default";

export class XAxisTick extends ComponentWidget {
  index: number;
  constructor({ index }: XAxisTickProps) {
    super();
    this.index = index;
  }
  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context);
    const data = DataProvider.of(context);
    const { xAxis, xAxisTick } = CustomProvider.of(context);

    if (xAxisTick.type === "custom") {
      return xAxisTick.Custom({}, { theme, data, index: this.index });
    }

    return DefaultXAxisTick({
      thickness: xAxisTick.thickness ?? xAxis.thickness ?? theme.border.width,
      length: xAxisTick.length ?? 10,
      color: xAxisTick.color ?? xAxis.color ?? theme.border.color,
    });
  }
}

export type XAxisTickProps = {
  index: number;
};

export default (props: XAxisTickProps) => new XAxisTick(props);
