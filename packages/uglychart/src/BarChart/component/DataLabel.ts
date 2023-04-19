import {
  ComponentWidget,
  Widget,
  BuildContext,
  TextStyle,
  SizedBox,
} from "@moonmoonbrothers/flutterjs";
import {
  CustomProvider as CustomProvider,
  DataProvider,
  ThemeProvider,
} from "../provider";
import { Font } from "../types";
import { Label } from "../../common";

export type DataLabelProps = {
  index: number;
  value: number;
  reverse?: boolean;
  label: string;
  legend: string;
  direction: "horizontal" | "vertical";
};
export type DataLabelConfig = {
  type: "config";
  font?: Font;
  backgroundColor?: string;
  visible?: boolean;
};

export class DataLabel extends ComponentWidget {
  constructor(private props: DataLabelProps) {
    super();
  }

  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context);
    const data = DataProvider.of(context);
    const { dataLabel } = CustomProvider.of(context);
    const { direction, value, label, legend, index } = this.props;

    if (dataLabel.type === "custom") {
      return dataLabel.Custom(
        {},
        { value, index, label, direction, data, theme, legend }
      );
    }

    const { backgroundColor, font, visible = false } = dataLabel;

    if (!visible) return SizedBox.shrink();

    return Label({
      text: value,
      backgroundColor,
      style: new TextStyle({
        fontFamily: font?.fontFamily ?? theme.text.fontFamily,
        fontSize: font?.fontSize ?? theme.text.fontSize,
        color: font?.color ?? theme.text.color,
        height: font?.lineHeight ?? theme.text.lineHeight,
      }),
    });
  }
}

export default (props: DataLabelProps) => new DataLabel(props);
