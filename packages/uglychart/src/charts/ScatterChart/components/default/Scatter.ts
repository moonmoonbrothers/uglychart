import {
  CustomPaint,
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
  Element,
  BuildContext,
} from "@moonmoonbrothers/flutterjs";
import { Scale } from "../../types";
import { functionalizeClass } from "../../../../utils";

class Scatter extends StatefulWidget {
  dotRadius: number;
  color: string;
  points: { x: number; y: number }[];
  scale: Scale;
  constructor({
    color,
    points,
    dotRadius,
    scale,
  }: {
    dotRadius: number;
    color: string;
    points: { x: number; y: number }[];
    scale: Scale;
  }) {
    super();
    this.color = color;
    this.points = points;
    this.dotRadius = dotRadius;
    this.scale = scale;
  }

  createState(): State<StatefulWidget> {
    return new ScatterState();
  }
}

class ScatterState extends State<Scatter> {
  animationController: AnimationController;
  tweenAnimation: Animation<number>;
  initState(context: BuildContext): void {
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
    const { color, points, dotRadius, scale } = this.widget;
    return Transform.scale({
      scale: this.tweenAnimation.value,
      child: _Scatter({
        color,
        points,
        dotRadius,
        scale,
      }),
    });
  }
}

function _Scatter({
  color,
  points,
  dotRadius,
  scale,
}: {
  dotRadius: number;
  color: string;
  points: { x: number; y: number }[];
  scale: Scale;
}) {
  return CustomPaint({
    size: Size.infinite,
    painter: {
      createDefaultSvgEl(context) {
        return {
          scatter: context.createSvgEl("path"),
        };
      },

      paint({ scatter: scatterEl }, { width, height }) {
        const resolvedPoints = points.map(({ x, y }) => ({
          x: ((x - scale.x.min) / (scale.x.max - scale.x.min)) * width,
          y:
            height - ((y - scale.y.min) / (scale.y.max - scale.y.min)) * height,
        }));

        const pathHelper = new Path();

        resolvedPoints.forEach((center) => {
          pathHelper.addOval(
            Rect.fromCircle({ center: new Offset(center), radius: dotRadius })
          );
        });

        scatterEl.setAttribute("stroke", color);
        scatterEl.setAttribute("fill", "none");
        scatterEl.setAttribute("stroke-width", `2`);
        scatterEl.setAttribute("d", pathHelper.getD());
      },
    },
  });
}

export default functionalizeClass(Scatter);
