import {
  Alignment,
  Column,
  ConstraintsTransformBox,
  Container,
  CrossAxisAlignment,
  MainAxisAlignment,
  MainAxisSize,
  FractionallySizedBox,
  Row,
  Widget,
  StatefulWidget,
  State,
  Animation,
  AnimationController,
  CurvedAnimation,
  Tween,
  Element,
  Curves,
} from "@moonmoonbrothers/flutterjs";
import { functionalizeClass } from "../../../../utils";

type YAxisProps = {
  ticks: Widget[];
  labels: Widget[];
  color: string;
  thickness: number;
};

class YAxis extends StatefulWidget {
  ticks: Widget[];
  labels: Widget[];
  color: string;
  thickness: number;
  constructor({ color, thickness, labels, ticks }: YAxisProps) {
    super();
    this.color = color;
    this.thickness = thickness;
    this.labels = labels;
    this.ticks = ticks;
  }
  createState(): State<StatefulWidget> {
    return new YAxisState();
  }
}

class YAxisState extends State<YAxis> {
  animationController: AnimationController;
  tweenAnimation: Animation<number>;
  initState(context: Element): void {
    this.animationController = new AnimationController({ duration: 200 });
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
    const { thickness, color, labels, ticks } = this.widget;
    const VerticalLine = () =>
      Container({
        width: thickness,
        color,
      });

    const Labels = () =>
      Column({
        mainAxisAlignment:
          ticks.length !== labels.length
            ? MainAxisAlignment.spaceAround
            : MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: labels.map((label) =>
          IgnoreChildWidth({
            child: label,
          })
        ),
      });

    const Ticks = () =>
      Column({
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: ticks.map((tick, index) =>
          IgnoreChildWidth({
            child: tick,
            isEdge: index === 0 || index === ticks.length - 1,
          })
        ),
      });

    return FractionallySizedBox({
      heightFactor: this.tweenAnimation.value,
      child: Row({
        mainAxisSize: MainAxisSize.min,
        children: [Labels(), Ticks(), VerticalLine()],
      }),
    });
  }
}

function IgnoreChildWidth({
  child,
  isEdge = false,
}: {
  child: Widget;
  isEdge?: boolean;
}) {
  return Container({
    height: 0,
    child: ConstraintsTransformBox({
      constraintsTransform: ConstraintsTransformBox.unconstrained,
      alignment: isEdge ? Alignment.topCenter : Alignment.center,
      child,
    }),
  });
}
export default functionalizeClass(YAxis);
