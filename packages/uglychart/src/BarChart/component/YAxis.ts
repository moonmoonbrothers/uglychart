import {
  Column,
  ComponentWidget,
  Container,
  Flexible,
  IntrinsicWidth,
  Row,
  Align,
  Widget,
  Alignment,
  Padding,
  EdgeInsets,
  SizedBox,
  BuildContext,
  MainAxisSize,
  MainAxisAlignment,
  CrossAxisAlignment,
} from "@moonmoonbrothers/flutterjs";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";
import YAxisLabel from "./YAxisLabel";

export type YAxisProps = {
  type: "index" | "value";
  labels: string[];
};

class YAxis extends ComponentWidget {
  constructor(private props: YAxisProps) {
    super();
  }

  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context);
    const data = DataProvider.of(context);
    const { yAxis } = CustomProvider.of(context);

    if (yAxis.type === "custom") {
      return yAxis.Custom({ YAxisLabel }, { theme, data });
    }

    let sortedLabels =
      this.props.type === "index"
        ? this.props.labels
        : [...this.props.labels].reverse();

    return Column({
      crossAxisAlignment: CrossAxisAlignment.end,
      mainAxisAlignment:
        this.props.type === "index"
          ? MainAxisAlignment.spaceEvenly
          : MainAxisAlignment.spaceBetween,
      children: sortedLabels.map((label, index) =>
        Flexible({
          child: Row({
            mainAxisSize: MainAxisSize.min,
            children: [
              YAxisLabel({ text: label, index }),
              SizedBox.shrink({ width: 2 }),
              Container({
                width: 10,
                height: 2,
                color: "black",
              }),
            ],
          }),
        })
      ),
    });
  }
}

export default (props: YAxisProps) => new YAxis(props);
