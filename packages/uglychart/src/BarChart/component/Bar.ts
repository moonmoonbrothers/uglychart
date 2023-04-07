import {
  Column,
  ComponentWidget,
  Container,
  Flexible,
  Row,
  Spacer,
  Stack,
  Widget,
} from "@moonmoonbrothers/flutterjs";
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";
import DataLabel from "./DataLabel";

export type BarProps = {
  backgroundColor: string;
  index: number;
  ratio: number;
  value: number;
  reverse?: boolean;
  label: string;
  legend: string;
  direction: "horizontal" | "vertical";
};

export class Bar extends ComponentWidget {
  constructor(private props: BarProps) {
    super();
  }

  build(context: BuildContext): Widget {
    const theme = ThemeProvider.of(context);
    const data = DataProvider.of(context);
    const { bar } = CustomProvider.of(context);

    const {
      backgroundColor,
      index,
      label,
      ratio,
      legend,
      value,
      direction,
      reverse = false,
    } = this.props;

    if (bar.type === "custom") {
      return bar.Custom(
        {},
        {
          backgroundColor,
          index,
          ratio,
          theme,
          label,
          legend,
          data,
          direction,
          reverse,
        }
      );
    }

    const { thickness = 2 } = bar;

    const BarWrapper = ({ children }: { children: Widget[] }) =>
      direction === "horizontal" ? Row({ children }) : Column({ children });

    const Bar = () =>
      Flexible({
        flex: ratio,
        child: Stack({
          children: [
            Container({
              color: backgroundColor,
              ...(direction === "horizontal"
                ? { height: thickness }
                : { width: thickness }),
            }),
            // It is wrapped by Positioned Widget
            DataLabel({
              value,
              index,
              label,
              legend,
              direction,
              reverse,
            }),
          ],
        }),
      });

    const Vacant = () => Spacer({ flex: 1 - ratio });

    return BarWrapper({
      children:
        (direction === "horizontal" && !reverse) ||
        (direction === "vertical" && reverse)
          ? [Bar(), Vacant()]
          : [Vacant(), Bar()],
    });
  }
}

export default (props: BarProps) => new Bar(props);
