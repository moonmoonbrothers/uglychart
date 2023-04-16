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
  TextStyle,
  ConstrainedBox,
  ConstraintsTransformBox,
  Constraints,
} from "@moonmoonbrothers/flutterjs";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";
import YAxisLabel from "./YAxisLabel";
import YAxisTick from "./YAxisTick";

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
      return yAxis.Custom({ YAxisLabel, YAxisTick }, { theme, data });
    }

    const axisThickness = yAxis.thickness ?? theme.border.width;
    const axisColor = yAxis.color ?? theme.border.color;

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
                  ? Alignment.centerRight
                  : index === 0
                  ? Alignment.topRight
                  : index === this.props.labels.length - 1
                  ? Alignment.topRight
                  : Alignment.centerRight,
              child: Row({
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container({
                    height: 0,
                    child: ConstraintsTransformBox({
                      constraintsTransform() {
                        return new Constraints();
                      },
                      child: YAxisLabel({ index, text: label }),
                    }),
                  }),
                  YAxisTick({ index, label }),
                ],
              }),
            }),
          })
        ),
      }),
    });
  }
}

export default (props: YAxisProps) => new YAxis(props);
