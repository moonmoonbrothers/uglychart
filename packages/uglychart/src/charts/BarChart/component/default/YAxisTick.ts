import { type Decoration, Container } from "@moonmoonbrothers/flutterjs";

export default function YAxisTick({
  thickness,
  length,
  color,
  decoration,
}: TickProp) {
  return Container({
    height: thickness,
    width: length,
    color,
    decoration,
  });
}

type TickProp = {
  thickness: number;
  length: number;
  color?: string;
  decoration?: Decoration;
};
