import MultiChildRenderObject from "../../renderobject/MultiChildRenderObject";
import {
  Alignment,
  Constraints,
  Offset,
  Size,
  TextDirection,
} from "../../type";
import Utils, { assert } from "../../utils";
import { Widget } from "../../widget";
import MultiChildRenderObjectWidget from "../../widget/MultiChildRenderObjectWidget";
import { RenderPositioned } from "./BasePositioned";

export type StackFit = "loose" | "expand" | "passthrough";

export default class BaseStack extends MultiChildRenderObjectWidget {
  alignment: Alignment;
  fit: StackFit;
  constructor({
    children,
    fit = "loose",
    alignment = Alignment.topLeft,
  }: {
    fit?: StackFit;
    alignment?: Alignment;
    children: Widget[];
  }) {
    super({ children });
    this.alignment = alignment;
    this.fit = fit;
  }

  createRenderObject(): RenderStack {
    return new RenderStack({
      alignment: this.alignment,
      fit: this.fit,
    });
  }

  updateRenderObject(renderObject: RenderStack): void {
    renderObject.alignment = this.alignment;
    renderObject.fit = this.fit;
  }
}

class RenderStack extends MultiChildRenderObject {
  alignment: Alignment;
  fit: StackFit;
  textDirection: TextDirection;
  constructor({
    fit = "loose",
    alignment = Alignment.topLeft,
    textDirection = TextDirection.ltr,
  }: {
    fit?: StackFit;
    alignment?: Alignment;
    textDirection?: TextDirection;
  }) {
    super({ isPainter: false });
    this.alignment = alignment;
    this.fit = fit;
    this.textDirection = textDirection;
  }

  private get resolvedAlignment(): Alignment {
    return this.alignment.resolve(this.textDirection);
  }

  private computeSize({ constraints }: { constraints: Constraints }) {
    let hasNonPositionedChildren = false;
    if (this.children.length === 0) {
      return constraints.biggest.isFinite
        ? constraints.biggest
        : constraints.smallest;
    }

    let [width, height] = [constraints.minWidth, constraints.minHeight];

    let nonPositionedConstraints: Constraints;

    switch (this.fit) {
      case "loose":
        nonPositionedConstraints = constraints.loosen();
        break;
      case "expand":
        nonPositionedConstraints = Constraints.tight(constraints.biggest);
        break;
      case "passthrough":
        nonPositionedConstraints = constraints;
        break;
    }

    this.children.forEach((child) => {
      if ((child instanceof RenderPositioned && child.isPositioned)) return;
      hasNonPositionedChildren = true;
      child.layout(nonPositionedConstraints);

      width = Math.max(width, child.size.width);
      height = Math.max(height, child.size.height);
    });

    let size: Size;
    if (hasNonPositionedChildren) {
      size = new Size({ width, height });
      assert(size.width === constraints.constrainWidth(width));
      assert(size.height === constraints.constrainWidth(height));
    } else {
      size = constraints.biggest;
    }

    return size;
  }

  static layoutPositionedChild({
    child,
    alignment,
    size,
  }: {
    child: RenderPositioned;
    alignment: Alignment;
    size: Size;
  }): void {
    assert(child.isPositioned, "child must be positioned");
    let childConstraints = new Constraints();

    if (child.left != null && child.right != null) {
      childConstraints = childConstraints.tighten({
        width: size.width - (child.left + child.right),
      });
    } else if (child.width != null) {
      childConstraints = childConstraints.tighten({
        width: child.width,
      });
    }

    if (child.top != null && child.bottom != null) {
      childConstraints = childConstraints.tighten({
        height: size.height - (child.top + child.bottom),
      });
    } else if (child.height != null) {
      childConstraints = childConstraints.tighten({
        height: child.height,
      });
    }

    child.layout(childConstraints);

    let x: number;

    if (child.left != null) {
      x = child.left;
    } else if (child.right != null) {
      x = size.width - child.right - child.size.width;
    } else {
      x = alignment.alongOffset(size.minus(child.size)).x;
    }

    let y: number;
    if (child.top != null) {
      y = child.top;
    } else if (child.bottom != null) {
      y = size.height - child.bottom - child.size.height;
    } else {
      y = alignment.alongOffset(size.minus(child.size)).y;
    }

    child.offset = new Offset({ x, y });
  }

  protected preformLayout(): void {
    this.size = this.computeSize({
      constraints: this.constraints,
    });

    this.children.forEach((child) => {
      if (!(child instanceof RenderPositioned && child.isPositioned)) {
        child.offset = this.resolvedAlignment.alongOffset(
          this.size.minus(child.size)
        );
      } else {
        RenderStack.layoutPositionedChild({
          child,
          size: this.size,
          alignment: this.resolvedAlignment,
        });
      }
    });
  }

  getIntrinsicWidth(height: number): number {
    return this.children
      .map((child) => child.getIntrinsicWidth(height))
      .reduce(Utils.maxReducer, 0);
  }

  getIntrinsicHeight(width: number): number {
    return this.children
      .map((child) => child.getIntrinsicHeight(width))
      .reduce(Utils.maxReducer, 0);
  }
}
