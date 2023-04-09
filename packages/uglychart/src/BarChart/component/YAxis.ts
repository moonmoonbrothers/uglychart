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
  OverflowBox,
  Alignment,
  VerticalDirection,
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
    return Container({
      decoration: new BoxDecoration({
        color: "gray",
        // border: new Border({
        //   left: new BorderSide({
        //     color: axisColor,
        //     width: axisThickness,
        //   }),
        // }),
      }),
      child: Column({
        // verticalDirection:
        //   this.props.type === "value"
        //     ? VerticalDirection.up
        //     : VerticalDirection.down,
        crossAxisAlignment: CrossAxisAlignment.end,
        mainAxisAlignment:
          this.props.type === "index"
            ? MainAxisAlignment.spaceEvenly
            : MainAxisAlignment.spaceBetween,
        children: this.props.labels.map((label, index) =>
          Row({
            mainAxisSize: MainAxisSize.min,
            children: [
              YAxisLabel({ text: label, index }),
              Container({
                height: 10,
                color: "black",
                width: 120, // yAxis.tick?.length ?? defaultYAxisConfig.tick.length,
                // child: OverflowBox({
                //   alignment:
                //     this.props.type === "index"
                //       ? Alignment.center
                //       : index === 0
                //       ? Alignment.topCenter
                //       : index === this.props.labels.length - 1
                //       ? Alignment.topCenter
                //       : Alignment.center,
                //   maxHeight: Infinity,
                //   child: Container({
                //     height:
                //       yAxis.tick?.thickness ??
                //       axisThickness ??
                //       defaultYAxisConfig.tick.thickness,
                //     color: yAxis.tick?.color ?? axisColor,
                //   }),
                // }),
              }),
            ],
          })
        ),
      }),
    });
  }
}

export default (props: YAxisProps) => new YAxis(props);
