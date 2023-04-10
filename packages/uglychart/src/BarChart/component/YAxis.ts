import {
  Column,
  ComponentWidget,
  Container,
  Flexible,
  Text,
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
  OverflowBox,
  Alignment,
  VerticalDirection,
  EdgeInsets,
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

    const axisThickness = yAxis.thickness ?? theme.border.width;
    const axisColor = yAxis.color ?? theme.border.color;

    const YTick = () =>
      Container({
        height:
          yAxis.tick?.thickness ??
          axisThickness ??
          defaultYAxisConfig.tick.thickness,
        color: yAxis.tick?.color ?? axisColor,
        width: yAxis.tick?.length ?? defaultYAxisConfig.tick.length,
      });

    return Container({
      decoration: new BoxDecoration({
        border: new Border({
          right: new BorderSide({
            color: axisColor,
            width: axisThickness,
          }),
        }),
      }),
      child: Column({
        verticalDirection:
          this.props.type === "value"
            ? VerticalDirection.up
            : VerticalDirection.down,
        crossAxisAlignment: CrossAxisAlignment.end,
        mainAxisAlignment:
          this.props.type === "index"
            ? MainAxisAlignment.spaceEvenly
            : MainAxisAlignment.spaceBetween,
        children: this.props.labels.map((label, index) =>
          Container({
            height: 0,
            child: OverflowBox({
              maxHeight: Infinity,
              alignment:
                this.props.type === "index"
                  ? Alignment.center
                  : index === 0
                  ? Alignment.topCenter
                  : index === this.props.labels.length - 1
                  ? Alignment.topCenter
                  : Alignment.center,
              child: Row({
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [Text("10"), YTick()],
              }),
            }),
          })
        ),
      }),
    });
  }
}

export default (props: YAxisProps) => new YAxis(props);
