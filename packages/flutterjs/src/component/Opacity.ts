import type Widget from "../widget/Widget";
import _Opacity from "./base/BaseOpacity";
function Opacity({ opacity, child }: { opacity: number; child?: Widget }) {
  return new _Opacity({ opacity, child });
}

export default Opacity;
