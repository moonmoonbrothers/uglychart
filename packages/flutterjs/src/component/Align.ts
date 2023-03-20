import Alignment from "../type/_types/AAlignment";
import type Widget from "../widget/Widget";
import _Align from "./base/BaseAlign";

export default function Align({
  child,
  alignment = Alignment.center,
  widthFactor,
  heightFactor,
}: {
  child?: Widget;
  alignment?: Alignment;
  widthFactor?: number;
  heightFactor?: number;
}) {
  return new _Align({
    child,
    alignment,
    widthFactor,
    heightFactor,
  });
}
