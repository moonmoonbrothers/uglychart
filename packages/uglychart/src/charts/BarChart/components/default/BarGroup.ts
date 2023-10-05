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
  Color,
  ToolTipPosition,
  Tooltip,
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
    this.label = label;
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
      Tooltip: TooltipContent,
      DataLabel,
      gap,
      label,
    } = this.widget;
    const total = maxValue - minValue;

    const isHorizontal = direction === "horizontal" ? true : false;
    const isVertical = direction === "vertical" ? true : false;

    const Bars = () =>
      values.map(({ color, data, legend }, index) => {
        const ratio = Math.abs(data / total);

        const Reverse = ({ child }: { child: Widget }) =>
          Transform({
            transform: Matrix4.diagonal3Values(
              isHorizontal && data < 0 ? -1 : 1,
              isVertical && data < 0 ? -1 : 1,
              1
            ),
            child,
          });

        return Container({
          width: isHorizontal ? Infinity : undefined,
          height: isVertical ? Infinity : undefined,
          child: FractionalTranslation({
            translation: new Offset({
              x: isHorizontal
                ? (data < 0
                    ? -1 * Math.max(0, maxValue)
                    : Math.max(0, -minValue)) / total
                : 0,
              y: isVertical
                ? (-1 *
                    (data < 0
                      ? -1 * Math.max(0, maxValue)
                      : Math.max(0, -minValue))) /
                  total
                : 0,
            }),
            child: FractionallySizedBox({
              alignment: data < 0 ? Alignment.topRight : Alignment.bottomLeft,
              heightFactor: isVertical
                ? ratio * this.tweenAnimation.value
                : undefined,
              widthFactor: isHorizontal
                ? ratio * this.tweenAnimation.value
                : undefined,
              child: Reverse({
                child: Stack({
                  alignment: Alignment.center,
                  children: [
                    Tooltip({
                      position: ToolTipPosition.topRight,
                      tooltip: FractionalTranslation({
                        translation: new Offset({ x: 0, y: 1 }),
                        child: Reverse({
                          child: TooltipContent({
                            label,
                            margin: EdgeInsets.symmetric({ horizontal: 5 }),
                            legend: {
                              name: legend,
                              color,
                            },
                            value: data,
                          }),
                        }),
                      }),
                      child: Bar({
                        backgroundColor: color,
                        direction,
                        index,
                        label,
                        value: data,
                        legend,
                      }),
                    }),
                    Positioned({
                      top: isVertical ? 0 : undefined,
                      right: isHorizontal ? 0 : undefined,
                      child: FractionalTranslation({
                        translation: new Offset({
                          x: isHorizontal ? 1 : 0,
                          y: isVertical ? -1 : 0,
                        }),
                        child: Reverse({
                          child: DataLabel({
                            index,
                            label,
                            legend,
                            value: data,
                          }),
                        }),
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
