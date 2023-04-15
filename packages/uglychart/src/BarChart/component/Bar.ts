import {
  ComponentWidget,
  Container,
  Widget,
} from "@moonmoonbrothers/flutterjs";
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget";
import { CustomProvider, DataProvider, ThemeProvider } from "../provider";
import { Bar as DefaultBar } from "./default";

export type BarProps = {
  backgroundColor: string;
  index: number;
  value: number;
  reverse?: boolean;
  label: string;
  legend: string;
  direction: "horizontal" | "vertical";
};

export type BarConfig = {
  thickness?: number;
};

const defaultBarConfig = {
  thickness: 2,
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
      legend,
      direction,
      reverse = false,
    } = this.props;

    if (bar.type === "custom") {
      return bar.Custom(
        {},
        {
          backgroundColor,
          index,
          theme,
          label,
          legend,
          data,
          direction,
          reverse,
        }
      );
    }

    const { thickness = theme.border.width ?? defaultBarConfig.thickness } =
      bar;

    return DefaultBar({
      color: backgroundColor,
      direction,
      thickness,
    });
  }
}

export default (props: BarProps) => new Bar(props);
