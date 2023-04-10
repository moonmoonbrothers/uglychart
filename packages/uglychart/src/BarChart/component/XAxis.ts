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
  OverflowBox,
  Alignment,
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

    const axisThickness = xAxis.thickness ?? theme.border.width;
    const axisColor = xAxis.color ?? theme.border.color;

    return Container({
      decoration: new BoxDecoration({
        border: new Border({
          top: new BorderSide({
            width: axisThickness,
            color: axisColor,
          }),
        }),
      }),
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
                width: 0,
                height: xAxis.tick?.length ?? defaultXAxisConfig.tick.length,
                child: OverflowBox({
                  alignment:
                    this.props.type === "index"
                      ? Alignment.center
                      : index === 0
                      ? Alignment.centerRight
                      : index === this.props.labels.length - 1
                      ? Alignment.centerRight
                      : Alignment.center,
                  maxWidth: Infinity,
                  maxHeight: Infinity,
                  minHeight: 0,
                  child: Container({
                    height:
                      xAxis.tick?.length ?? defaultXAxisConfig.tick.length,
                    width:
                      xAxis.tick?.thickness ??
                      axisThickness ??
                      defaultXAxisConfig.tick.thickness,
                    color: xAxis.tick?.color ?? axisColor,
                  }),
                }),
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
