import {
  Alignment,
  Axis,
  CrossAxisAlignment,
  EdgeInsets,
  Element,
  Expanded,
  Flex,
  FractionallySizedBox,
  MainAxisSize,
  Matrix4,
  Padding,
  Stack,
  State,
  StatefulWidget,
  Transform,
  Widget,
  Animation,
  AnimationController,
  Tween,
  CurvedAnimation,
  Curves,
  Opacity,
  SizedBox,
  FractionalTranslation,
  Offset,
  Container,
  Positioned,
} from "@moonmoonbrothers/flutterjs";
import { functionalizeClass } from "../../../../utils";
import { BarProps } from "../Bar";
import { TooltipProps } from "../Tooltip";
import { DataLabelProps } from "../../../../common/CartesianChart/component/DataLabel";

class BarGroup extends StatefulWidget {
  direction: "vertical" | "horizontal";
  gap: number;
  values: {
    data: number;
    legend: string;
    color: string;
  }[];
  minValue: number;
  maxValue: number;
  Bar: (props: BarProps) => Widget;
  Tooltip: (props: TooltipProps) => Widget;
  DataLabel: (props: DataLabelProps) => Widget;
  label: string;
  constructor({
    direction,
    values,
    minValue,
    maxValue,
    Bar,
    Tooltip,
    DataLabel,
    gap,
    label,
  }: BarGroupProps) {
    super();
    this.direction = direction;
    this.gap = gap;
    this.values = values;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.Bar = Bar;
    this.Tooltip = Tooltip;
    this.DataLabel = DataLabel;
  }

  createState(): State<StatefulWidget> {
    return new BarGroupState();
  }
}

class BarGroupState extends State<BarGroup> {
  animationController: AnimationController;
  tweenAnimation: Animation<number>;
  initState(context: Element): void {
    this.animationController = new AnimationController({ duration: 300 });
    this.animationController.addListener(() => {
      this.setState();
    });
    const tween: Tween<number> = new Tween({ begin: 0, end: 1 });
    this.tweenAnimation = tween.animated(
      new CurvedAnimation({
        parent: this.animationController,
        curve: Curves.easeInOut,
      })
    );
    this.animationController.forward();
  }
  build(context: Element): Widget {
    const {
      direction,
      minValue,
      maxValue,
      values,
      Bar,
      Tooltip,
      DataLabel,
      gap,
      label,
    } = this.widget;

    // const Bars = ({ type }: { type: "negative" | "positive" }) =>
    //   children.map((child, index) => {
    //     const ratio =
    //       type === "negative"
    //         ? negativeBarRatios[index]
    //         : positiveBarRatios[index];
    //     const animatedRatio = ratio * this.tweenAnimation.value;

    //     return FractionallySizedBox({
    //       widthFactor: direction === "horizontal" ? animatedRatio : undefined,
    //       heightFactor: direction === "vertical" ? animatedRatio : undefined,
    //       child: Opacity({
    //         opacity: ratio !== 0 ? 1 : 0,
    //         child,
    //       }),
    //     });
    //   });
    const total = maxValue - minValue;

    const Bars = () =>
      values.map(({ color, data, legend }, index) => {
        const ratio = Math.abs(data / total);

        return Container({
          child: FractionalTranslation({
            translation: new Offset({ x: 0, y: (1 / 2) * (data < 0 ? 1 : -1) }),
            child: FractionallySizedBox({
              heightFactor: ratio,
              child: Transform({
                child: Stack({
                  alignment: Alignment.center,
                  children: [
                    Bar({
                      backgroundColor: color,
                      direction,
                      index,
                      label,
                      value: data,
                      legend,
                    }),
                    Positioned({
                      top: 0,
                      child: DataLabel({
                        index,
                        label,
                        legend,
                        value: data,
                      }),
                    }),
                  ],
                }),
              }),
            }),
          }),
        });
      });

    const Grouping = ({ children }: { children: Widget[] }) =>
      Flex({
        mainAxisSize: MainAxisSize.min,
        direction: direction === "vertical" ? Axis.horizontal : Axis.vertical,
        children: children.map((child) =>
          Padding({
            padding: EdgeInsets.symmetric(
              direction === "horizontal"
                ? { vertical: gap / 2 }
                : { horizontal: gap / 2 }
            ),
            child,
          })
        ),
      });

    return Container({
      height: Infinity,
      child: Grouping({
        children: Bars(),
      }),
    });
  }
}
export default functionalizeClass(BarGroup);

type BarGroupProps = {
  direction: "vertical" | "horizontal";
  gap: number;
  values: {
    data: number;
    legend: string;
    color: string;
  }[];
  minValue: number;
  maxValue: number;
  Bar: (props: BarProps) => Widget;
  Tooltip: (props: TooltipProps) => Widget;
  DataLabel: (props: DataLabelProps) => Widget;
  label: string;
};
