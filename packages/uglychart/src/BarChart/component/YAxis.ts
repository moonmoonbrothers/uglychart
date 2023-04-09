import {
  Column,
  ComponentWidget,
  Container,
  Flexible,
  Row,
  Widget,
  SizedBox,
  BuildContext,
  MainAxisSize,
  MainAxisAlignment,
  CrossAxisAlignment,
  DecoratedBox,
  BoxDecoration,
  Border,
  BorderSide,
} from "@moonmoonbrothers/flutterjs";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";
import YAxisLabel from "./YAxisLabel";

export type YAxisProps = {
  type: "index" | "value";
  labels: string[];
};

export const defaultYAxisConfig = {
  tick: {
    thickness: 2,
    length: 10,
  },
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

    return DecoratedBox({
      decoration: new BoxDecoration({
        border: new Border({
          right: new BorderSide({
            color: yAxis.color ?? theme.border.color,
            width: yAxis.thickness ?? theme.border.width,
          }),
        }),
      }),
      child: Column({
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
                Container({
                  width: yAxis.tick?.length ?? defaultYAxisConfig.tick.length,
                  height:
                    yAxis.tick?.thickness ?? defaultYAxisConfig.tick.thickness,
                  color: yAxis.color ?? theme.border.color,
                }),
              ],
            }),
          })
        ),
      }),
    });
  }
}

export default (props: YAxisProps) => new YAxis(props);
