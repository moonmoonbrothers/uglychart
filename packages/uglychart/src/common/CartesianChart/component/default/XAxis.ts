import {
  Alignment,
  Column,
  ConstraintsTransformBox,
  Container,
  CrossAxisAlignment,
  FractionallySizedBox,
  MainAxisAlignment,
  MainAxisSize,
  Row,
  StatefulWidget,
  Widget,
  State,
  Element,
  Animation,
  AnimationController,
  Tween,
  CurvedAnimation,
} from "@moonmoonbrothers/flutterjs";
import { functionalizeClass } from "../../../../utils";

type XAxisProps = {
  ticks: Widget[];
  labels: Widget[];
  color: string;
  thickness: number;
};

class XAxis extends StatefulWidget {
  ticks: Widget[];
  labels: Widget[];
  color: string;
  thickness: number;
  constructor({ color, thickness, labels, ticks }: XAxisProps) {
    super();
    this.color = color;
    this.thickness = thickness;
    this.labels = labels;
    this.ticks = ticks;
  }
  createState(): State<StatefulWidget> {
    return new XAxisState();
  }
}

class XAxisState extends State<XAxis> {
  animationController: AnimationController;
  tweenAnimation: Animation<number>;
  initState(context: Element): void {
    this.animationController = new AnimationController({ duration: 200 });
    this.animationController.addListener(() => {
      this.setState();
    });
    const tween: Tween<number> = new Tween({ begin: 0, end: 1 });
    this.tweenAnimation = tween.animated(
      new CurvedAnimation({ parent: this.animationController })
    );
    this.animationController.forward();
  }
  build(context: Element): Widget {
    const { thickness, color, labels, ticks } = this.widget;
    const HorizontalLine = () =>
      Container({
        height: thickness,
        color,
      });

    const Labels = () =>
      Row({
        mainAxisAlignment:
          ticks.length !== labels.length
            ? MainAxisAlignment.spaceAround
            : MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: labels.map((label, index) =>
          IgnoreChildWidth({
            child: label,
          })
        ),
      });

    const Ticks = () =>
      Row({
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: ticks.map((tick, index) =>
          IgnoreChildWidth({
            child: tick,
            isEdge: index === 0 || index === ticks.length - 1,
          })
        ),
      });

    return FractionallySizedBox({
      widthFactor: this.tweenAnimation.value,
      child: Column({
        mainAxisSize: MainAxisSize.min,
        children: [HorizontalLine(), Ticks(), Labels()],
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
    width: 0,
    child: ConstraintsTransformBox({
      constraintsTransform: ConstraintsTransformBox.unconstrained,
      alignment: isEdge ? Alignment.centerRight : Alignment.center,
      child,
    }),
  });
}

export default functionalizeClass(XAxis);
