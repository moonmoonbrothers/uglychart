import {
  Column,
  Container,
  MainAxisSize,
  Text,
  SizedBox,
  Row,
  MainAxisAlignment,
  EdgeInsets,
  TextStyle,
  CrossAxisAlignment,
  Stack,
  Positioned,
  BoxDecoration,
  Opacity,
  BorderRadius,
  Radius,
} from "@moonmoonbrothers/flutterjs";

function Tooltip({
  value,
  label,
  legend,
  margin,
  fontFamily,
}: {
  value: number;
  label: string;
  legend: {
    name: string;
    color: string;
  };
  margin?: EdgeInsets;
  fontFamily: string;
}) {
  return Container({
    margin,
    width: 120,
    height: 60,
    child: Stack({
      children: [
        Positioned.fill({
          child: Opacity({
            opacity: 0.7,
            child: Container({
              decoration: new BoxDecoration({
                color: "black",
                borderRadius: BorderRadius.all(Radius.circular(4)),
              }),
            }),
          }),
        }),
        Container({
          padding: EdgeInsets.symmetric({ vertical: 10, horizontal: 12 }),
          child: Column({
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(label, {
                style: new TextStyle({
                  color: "white",
                  fontFamily,
                  fontWeight: "bold",
                  fontSize: 14,
                }),
              }),
              Row({
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Row({
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Container({
                        color: legend.color,
                        width: 8,
                        height: 8,
                      }),
                      SizedBox({ width: 4 }),
                      Text(legend.name, {
                        style: new TextStyle({
                          color: "white",
                          fontFamily,
                          fontSize: 12,
                          height: 1.4,
                          fontWeight: "600",
                        }),
                      }),
                    ],
                  }),
                  Text(`${value}`, {
                    style: new TextStyle({
                      color: "white",
                      fontFamily,
                      fontSize: 12,
                      height: 1.4,
                      fontWeight: "600",
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    }),
  });
}

export default Tooltip;
