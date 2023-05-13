import {
  Widget,
  BuildContext,
  TextStyle,
  SizedBox,
  EdgeInsets,
} from "@moonmoonbrothers/flutterjs";
import { Font } from "../types";
import { DataLabel as DefaultDataLabel } from "./default";
import CartesianChartContextWidget from "../CartesianChartContextWidget";

export type DataLabelProps = {
  index: number;
  value: number;
  label: string;
  legend: string;
};
export type DataLabelConfig = {
  font?: Font;
  backgroundColor?: string;
  visible?: boolean;
  margin?: EdgeInsets;
  padding?: EdgeInsets;
};

export class DataLabel extends CartesianChartContextWidget {
  constructor(private props: DataLabelProps) {
    super();
  }

  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { dataLabel } = this.getCustom(context);
    const { value, label, legend, index } = this.props;

    if (dataLabel.type === "custom") {
      return dataLabel.Custom({}, { value, index, label, data, theme, legend });
    }

    const {
      backgroundColor,
      font,
      visible = false,
      margin,
      padding,
    } = dataLabel;

    if (!visible) return SizedBox.shrink();

    return DefaultDataLabel({
      text: value,
      backgroundColor,
      margin,
      padding,
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
