import {
  Column,
  Container,
  MainAxisSize,
  ToolTipPosition,
  Widget,
  Text,
  Tooltip as _Tooltip,
  SizedBox,
  Row,
  MainAxisAlignment,
  EdgeInsets,
} from "@moonmoonbrothers/flutterjs";

function Tooltip({
  child,
  position,
  value,
  label,
  legend,
  margin,
}: {
  child: Widget;
  position: ToolTipPosition;
  value: number;
  label: string;
  legend: {
    name: string;
    color: string;
  };
  margin: EdgeInsets;
}) {
  return _Tooltip({
    child,
    position,
    tooltip: Container({
      margin,
      width: 200,
      height: 200,
      child: Column({
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label),
          Row({
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row({
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container({
                    color: legend.color,
                    width: 16,
                    height: 16,
                  }),
                  SizedBox({ width: 16 }),
                  Text(legend.name),
                ],
              }),
              Text(`${value}`),
            ],
          }),
        ],
      }),
    }),
  });
}

export default Tooltip;
