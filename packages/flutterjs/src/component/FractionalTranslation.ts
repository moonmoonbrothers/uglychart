import type Widget from "../widget/Widget";
import _FractionalTranslation from "./base/BaseFractionalTranslation";
type Offset = { x: number; y: number };
function FractionalTranslation({
  translation,
  child,
}: {
  translation: Offset;
  child?: Widget;
}) {
  return new _FractionalTranslation({ translation, child });
}

export default FractionalTranslation;
