import SingleChildRenderObject from "$lib/flutter/renderobject/SingleChildRenderObject"
import { Offset } from "$lib/flutter/type"
import SingleChildRenderObjectWidget from "$lib/flutter/widget/SingleChildRenderObjectWidget"
import type Widget from "$lib/flutter/widget/Widget"

type TransformProps = {
  translate?: {
    x?: number
    y?: number
  }
  child?: Widget
}

class Transform extends SingleChildRenderObjectWidget {
  translate: {
    x: number
    y: number
  }
  constructor({ child, translate: { x = 0, y = 0 } = {} }: TransformProps) {
    super({ child })
    this.translate = { x, y }
  }

  override createRenderObject(): SingleChildRenderObject {
    return new RenderTransform({ translate: this.translate })
  }

  updateRenderObject(renderObject: RenderTransform): void {
    renderObject.translate = this.translate
  }
}

class RenderTransform extends SingleChildRenderObject {
  translate: {
    x: number
    y: number
  }

  constructor({ translate }: { translate: { x: number; y: number } }) {
    super({ isPainter: false })
    this.translate = translate
  }

  protected override preformLayout(): void {
    if (this.child != null) {
      this.child.layout(this.constraint)
      this.size = this.child.size
      this.child.offset = new Offset({ x: this.translate.x, y: this.translate.y })
    }
  }
}

export default Transform
