/* eslint-disable @typescript-eslint/no-unused-vars */
import { RenderOwner } from "../scheduler";
import { Size, Constraints } from "../type";
import RenderObject from "./RenderObject";

class RenderView extends RenderObject {
  constructor({ renderOwner }: { renderOwner: RenderOwner }) {
    super({ isPainter: false });
    this.renderOwner = renderOwner;
  }
  preformLayout(): void {
    const constraint = this.constraints;
    if (!constraint.isTight)
      throw { message: "constraint must be tight on render view" };
    this.size = new Size({
      width: constraint.maxWidth,
      height: constraint.maxHeight,
    });
    this.children.forEach((child) =>
      child.layout(Constraints.loose(this.size))
    );
  }
}

export default RenderView;
