import type Widget from "../widget/Widget";
import _ColoredBox from "./base/BaseColoredBox";

export default function ColoredBox({
  child,
  color,
}: {
  child?: Widget;
  color: string;
}) {
  return new _ColoredBox({
    child,
    color,
  });
}
