import {
  Align,
  Alignment,
  Column,
  ComponentWidget,
  Container,
  Flexible,
  IntrinsicHeight,
  Row,
  Widget,
  SizedBox,
  BuildContext,
  MainAxisSize,
  MainAxisAlignment,
  CrossAxisAlignment,
  EdgeInsets,
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
  }
}

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

    return Container({
      padding: EdgeInsets.symmetric({ horizontal: 2 }),
      child: Row({
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
                width: 2,
                height: 10,
                color: "black",
              }),
              XAxisLabel({ text: `${label}`, index }),
            ],
          })
        ),
      }),
    });
  }
}

export default (props: XAxisProps) => new XAxis(props);
