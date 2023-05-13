import {
  Alignment,
  Column,
  ConstraintsTransformBox,
  Container,
  CrossAxisAlignment,
  MainAxisAlignment,
  MainAxisSize,
  Row,
  Widget,
} from "@moonmoonbrothers/flutterjs";

export default function YAxis({ color, thickness, labels, ticks }: YAxisProps) {
  const VerticalLine = () =>
    Container({
      width: thickness,
      color,
    });

  const Labels = () =>
    Column({
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
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

  return Row({
    mainAxisSize: MainAxisSize.min,
    children: [Labels(), Ticks(), VerticalLine()],
  });
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

type YAxisProps = {
  ticks: Widget[];
  labels: Widget[];
  color: string;
  thickness: number;
};
