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

    return Column({
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: this.props.labels.map((label, index) =>
        Flexible({
          child: Row({
            mainAxisSize: MainAxisSize.min,
            children: [
              YAxisLabel({ text: label, index }),
              SizedBox({ width: 2 }),
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
