import {
  CustomPaint,
  Element,
  Offset,
  Path,
  Rect,
  Size,
  State,
  StatefulWidget,
  Widget,
  Animation,
  AnimationController,
  Tween,
  CurvedAnimation,
  Transform,
  Curves,
} from "@moonmoonbrothers/flutterjs";
import { Scale } from "../../types";
import { functionalizeClass } from "../../../../utils";

class Bubble extends StatefulWidget {
  bubbleMinRadius: number;
  bubbleMaxRadius: number;
  color: string;
  points: { x: number; y: number; value: number }[];
  scale: Scale;
  constructor({
    color,
    points,
    bubbleMinRadius,
    bubbleMaxRadius,
    scale,
  }: {
    bubbleMinRadius: number;
    bubbleMaxRadius: number;
    color: string;
    points: { x: number; y: number; value: number }[];
    scale: Scale;
  }) {
    super();
    this.color = color;
    this.points = points;
    this.bubbleMinRadius = bubbleMinRadius;
    this.bubbleMaxRadius = bubbleMaxRadius;
    this.scale = scale;
  }
  createState(): State<StatefulWidget> {
    return new BubbleState();
  }
}

class BubbleState extends State<Bubble> {
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
    const { color, points, bubbleMinRadius, bubbleMaxRadius, scale } =
      this.widget;

    return Transform.scale({
      scale: this.tweenAnimation.value,
      child: _Bubble({
        color,
        points,
        bubbleMinRadius,
        bubbleMaxRadius,
        scale,
      }),
    });
  }
}

function _Bubble({
  color,
  points,
  bubbleMinRadius,
  bubbleMaxRadius,
  scale,
}: {
  bubbleMinRadius: number;
  bubbleMaxRadius: number;
  color: string;
  points: { x: number; y: number; value: number }[];
  scale: Scale;
}) {
  return CustomPaint({
    size: Size.infinite,
    painter: {
      createDefaultSvgEl(context) {
        return {
          bubble: context.createSvgEl("path"),
        };
      },

      paint({ bubble: bubbleEl }, { width, height }) {
        const resolvedPoints = points.map(({ x, y, value }) => ({
          x: ((x - scale.x.min) / (scale.x.max - scale.x.min)) * width,
          y:
            height - ((y - scale.y.min) / (scale.y.max - scale.y.min)) * height,
          r:
            bubbleMinRadius +
            ((value - scale.value.min) / (scale.value.max - scale.value.min)) *
              (bubbleMaxRadius - bubbleMinRadius),
        }));

        const pathHelper = new Path();

        resolvedPoints.forEach(({ r, ...center }) => {
          pathHelper.addOval(
            Rect.fromCircle({
              center: new Offset(center),
              radius: r,
            })
          );
        });

        bubbleEl.setAttribute("fill", color);
        bubbleEl.setAttribute("stroke-width", `0`);
        bubbleEl.setAttribute("d", pathHelper.getD());
        bubbleEl.setAttribute("opacity", "0.8");
      },
    },
  });
}

export default functionalizeClass(Bubble);
