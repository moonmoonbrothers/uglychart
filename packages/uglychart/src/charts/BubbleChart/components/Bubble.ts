import { Widget } from "@moonmoonbrothers/flutterjs";
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget";
import { Bubble as DefaultBubble } from "./default";
import type { Custom, Dependencies, Data, Theme, Scale } from "../types";
import ChartContextWidget from "../../../common/ChartContextWidget";

export type BubbleProps = {
  color: string;
  points: { x: number; y: number; value: number }[];
};

export type BubbleConfig = {
  bubbleMinRadius?: number;
  bubbleMaxRadius?: number;
};

const defaultBubbleConfig = {
  bubbleMinRadius: 1,
  bubbleMaxRadius: 50,
};

export class Bubble extends ChartContextWidget<
  Custom,
  Dependencies,
  Theme,
  Data,
  Scale
> {
  constructor(private props: BubbleProps) {
    super();
  }

  build(context: BuildContext): Widget {
    const theme = this.getTheme(context);
    const data = this.getData(context);
    const { bubble } = this.getCustom(context);
    const scale = this.getScale(context);
    const { color, points } = this.props;

    if (bubble.type === "custom") {
      return bubble.Custom(
        {},
        {
          scale,
          ...this.props,
          theme,
          data,
        }
      );
    }

    const {
      bubbleMinRadius = defaultBubbleConfig.bubbleMinRadius,
      bubbleMaxRadius = defaultBubbleConfig.bubbleMaxRadius,
    } = bubble;

    return DefaultBubble({
      color,
      bubbleMinRadius,
      bubbleMaxRadius,
      points,
      scale,
    });
  }
}

export default (props: BubbleProps) => new Bubble(props);
