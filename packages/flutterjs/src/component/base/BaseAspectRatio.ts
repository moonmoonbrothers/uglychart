import SingleChildRenderObject from "../../renderobject/SingleChildRenderObject";
import { assert } from "../../utils";
import SingleChildRenderObjectWidget from "../../widget/SingleChildRenderObjectWidget";
import type Widget from "../../widget/Widget";

class AspectRatio extends SingleChildRenderObjectWidget {
  aspectRatio: number;
  constructor({ child, aspectRatio }: { child?: Widget; aspectRatio: number }) {
    super({ child });
    this.aspectRatio = aspectRatio;
  }

  override createRenderObject(): SingleChildRenderObject {
    return new RenderAspectRatio({
      aspectRatio: this.aspectRatio,
    });
  }

  updateRenderObject(renderObject: RenderAspectRatio): void {
    renderObject.aspectRatio = this.aspectRatio;
  }
}

class RenderAspectRatio extends SingleChildRenderObject {
  _aspectRatio!: number;
  get aspectRatio(): number {
    return this._aspectRatio;
  }
  set aspectRatio(value: number) {
    this._aspectRatio = value;
  }

  constructor({ aspectRatio }: { aspectRatio: number }) {
    super({ isPainter: false });
    this.aspectRatio = aspectRatio;
  }

  protected override preformLayout(): void {
    if (this.child != null) {
      this.child.layout(this.constraints);
      this.size = this.child.size;
    }
  }
}

export default AspectRatio;
