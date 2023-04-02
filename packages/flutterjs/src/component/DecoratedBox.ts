import { Decoration } from "../type";
import Widget from "../widget/Widget";
import _DecoratedBox from "./base/BaseDecoratedBox";

export default function DecoratedBox({
  decoration,
  child,
}: {
  decoration: Decoration;
  child?: Widget;
}) {
  return new _DecoratedBox({ decoration, child });
}
