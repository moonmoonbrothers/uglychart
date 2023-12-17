import { RenderZIndex } from "../component/base/BaseZIndex";
import RenderObject from "./RenderObject";

interface RenderObjectVisitor {
  visitZIndex(renderObject: RenderZIndex);
  visitGeneral(renderObject: RenderObject);
}

export default RenderObjectVisitor;
