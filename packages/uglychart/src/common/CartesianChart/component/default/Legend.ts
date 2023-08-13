import {
  Container,
  EdgeInsets,
  Text,
  TextStyle,
  Row,
  MainAxisSize,
  CrossAxisAlignment,
  GestureDetector,
  CustomPaint,
  Size,
  BoxDecoration,
  Border,
  SizedBox,
} from "@moonmoonbrothers/flutterjs";
import { Check } from "../../../components";
export default function Legend({
  legendStates,
  style,
  margin = EdgeInsets.only({ top: 5 }),
  gap = 20,
}: LegendProps) {
  return Container({
    margin,
    child: Row({
      mainAxisSize: MainAxisSize.min,
      children: legendStates.map((state) => {
        const { label, visible, color } = state;
        return Container({
          padding: EdgeInsets.symmetric({ horizontal: gap }),
          child: GestureDetector({
            onClick() {
              state.visible = !state.visible;
            },
            child: Row({
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Container({
                  width: style.fontSize ? style.fontSize + 2 : 13,
                  height: style.fontSize ? style.fontSize + 2 : 13,
                  padding: EdgeInsets.all(1),
                  decoration: new BoxDecoration({
                    border: Border.all({ width: 1, color: "grey" }),
                  }),
                  child: visible ? Check() : undefined,
                }),
                Container({
                  margin: EdgeInsets.symmetric({ horizontal: 4 }),
                  width: style.fontSize ?? 11,
                  height: style.fontSize ?? 11,
                  color,
                }),
                Text(label, { style }),
              ],
            }),
          }),
        });
      }),
    }),
  });
}

type LegendProps = {
  legendStates: {
    color: string;
    label: string;
    visible: boolean;
  }[];
  style: TextStyle;
  margin?: EdgeInsets;
  gap?: number;
};
