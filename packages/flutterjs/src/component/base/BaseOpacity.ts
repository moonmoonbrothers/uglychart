import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject";
import { assert } from "../../utils";
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget";
import type Widget from "../../widget/Widget";

class Opacity extends SingleChildRenderObjectWidget {
  opacity: number;
  constructor({ child, opacity }: { child?: Widget; opacity: number }) {
    super({ child });
    this.opacity = opacity;
  }

  override createRenderObject(): SingleChildRenderObject {
    return new RenderOpacity({
      opacity: this.opacity,
    });
  }

  updateRenderObject(renderObject: RenderOpacity): void {
    renderObject.opacity = this.opacity;
  }
}

class RenderOpacity extends SingleChildRenderObject {
  _opacity!: number;
  get opacity(): number {
    return this._opacity;
  }
  set opacity(value: number) {
    assert(value >= 0 && value <= 1.0);
    this._opacity = value;
  }

  constructor({ opacity }: { opacity: number }) {
    super({ isPainter: false });
    this.opacity = opacity;
  }

  protected override preformLayout(): void {
    if (this.child != null) {
      this.child.layout(this.constraints);
      this.size = this.child.size;
    }
  }

  getChildOpacity(parentOpacity: number): number {
    return parentOpacity * this.opacity;
  }
}

export default Opacity;