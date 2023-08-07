import Animation from "./Animation";
import Curve from "./Curve";

class CurvedAnimation extends Animation<number> {
  parent: Animation<number>;
  curve: Curve;
  constructor({ parent, curve }: { parent: Animation<number>; curve: Curve }) {
    super();
    this.parent = parent;
    this.curve = curve;
  }

  get value(): number {
    return this.curve.transform(this.parent.value);
  }

  dispose() {
    //
  }
}

export default CurvedAnimation;
