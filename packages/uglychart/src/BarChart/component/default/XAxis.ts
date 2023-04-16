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

export default function XAxis({ color, thickness, labels, ticks }: XAxisProps) {
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

  return Column({
    mainAxisSize: MainAxisSize.min,
    children: [HorizontalLine(), Ticks(), Labels()],
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
    width: 0,
    child: ConstraintsTransformBox({
      constraintsTransform: ConstraintsTransformBox.unconstrained,
      alignment: isEdge ? Alignment.centerRight : Alignment.center,
      child,
    }),
  });
}

type XAxisProps = {
  ticks: Widget[];
  labels: Widget[];
  color: string;
  thickness: number;
};
