import type Widget from "../widget/Widget";
import _AspectRatio from "./base/BaseAspectRatio";
function AspectRatio({
  aspectRatio,
  child,
}: {
  aspectRatio: number;
  child?: Widget;
}) {
  return new _AspectRatio({ aspectRatio, child });
}

export default AspectRatio;
