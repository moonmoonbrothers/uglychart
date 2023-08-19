import { Element } from "../element";
import { Path, Size } from "../type";
import { functionalizeClass } from "../utils";
import { StatelessWidget } from "../widget";
import Widget from "../widget/Widget";
import BaseClipPath from "./base/BaseClipPath";

class ClipPath extends StatelessWidget {
  clipped: boolean;
  child?: Widget;
  clipper: (size: Size) => Path;
  constructor({
    child,
    clipped = true,
    key,
    clipper,
  }: {
    key?: any;
    child?: Widget;
    clipper: (size: Size) => Path;
    clipped?: boolean;
  }) {
    super(key);
    this.child = child;
    this.clipper = clipper;
    this.clipped = clipped;
  }

  build(context: Element): Widget {
    if (!this.clipped) return this.child;
    return new BaseClipPath({ child: this.child, clipper: this.clipper });
  }
}

export default functionalizeClass(ClipPath);
