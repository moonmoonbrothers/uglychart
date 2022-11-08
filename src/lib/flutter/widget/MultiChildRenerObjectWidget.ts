import MultiChildRenderObject from "../renderobject/MultiChildRenderObject"
import RenderObjectWidget from "./RenderObjectWidget"

class MultiChildRenderObjectWidget extends RenderObjectWidget {
  createRenderObject(): MultiChildRenderObject {
    return new MultiChildRenderObject()
  }
}

export default MultiChildRenderObject
