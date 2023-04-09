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
  EdgeInsets,
  DecoratedBox,
  BoxDecoration,
  Border,
  BorderSide,
} from "@moonmoonbrothers/flutterjs";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";
import XAxisLabel from "./XAxisLabel";

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
    const theme = ThemeProvider.of(context);
    const data = DataProvider.of(context);
    const { xAxis } = CustomProvider.of(context);

    if (xAxis.type === "custom") {
      return xAxis.Custom({ XAxisLabel }, { theme, data });
    }

    return Row({
      mainAxisAlignment:
        this.props.type === "index"
          ? MainAxisAlignment.spaceEvenly
          : MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: this.props.labels.map((label, index) =>
        Column({
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container({
              height: xAxis.tick?.length ?? defaultXAxisConfig.tick.length,
              width: xAxis.tick?.thickness ?? defaultXAxisConfig.tick.thickness,
              color: xAxis.tick?.color ?? theme.border.color,
            }),
            XAxisLabel({ text: `${label}`, index }),
          ],
        })
      ),
    });
  }
}

export default (props: XAxisProps) => new XAxis(props);
