import Widget from "../widget/Widget";
import _DecoratedBox from "./base/BaseDecoratedBox";

type Decoration = {
  color?: string;
};

export default function DecoratedBox({decoration, child}: {decoration: Decoration, child?: Widget}) {
  return new _DecoratedBox({decoration, child});
}
