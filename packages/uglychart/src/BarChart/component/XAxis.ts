import {
  Column,
  ComponentWidget,
  Container,
  Row,
  Widget,
  BuildContext,
  MainAxisSize,
  MainAxisAlignment,
  CrossAxisAlignment,
  BoxDecoration,
  Border,
  BorderSide,
  Alignment,
  ConstraintsTransformBox,
  SizedBox,
} from "@moonmoonbrothers/flutterjs";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";
import XAxisLabel from "./XAxisLabel";
import XAxisTick from "./XAxisTick";
import { XAxis as DefaultXAxis } from "./default";

export type XAxisProps = {
  type: "index" | "value";
  labels: string[];
};

export const defaultXAxisConfig = {
  tick: {
    thickness: 2,
    length: 10,
  },
};

class XAxis extends ComponentWidget {
  constructor(private props: XAxisProps) {
    super();
  }

  build(context: BuildContext): Widget {
    const { type } = this.props;
    const theme = ThemeProvider.of(context);
    const data = DataProvider.of(context);
    const { xAxis } = CustomProvider.of(context);

    if (xAxis.type === "custom") {
      return xAxis.Custom({ XAxisLabel, XAxisTick }, { theme, data });
    }

    const labels = this.props.labels.map((label, index) =>
      XAxisLabel({ index, text: label })
    );
    const ticks = this.props.labels.map((_, index) => XAxisTick({ index }));

    return DefaultXAxis({
      color: xAxis.color ?? theme.border.color,
      thickness: xAxis.thickness ?? theme.border.width,
      labels,
      ticks:
        type === "index"
          ? [...ticks, XAxisTick({ index: ticks.length })]
          : ticks,
    });
  }
}

export default (props: XAxisProps) => new XAxis(props);
