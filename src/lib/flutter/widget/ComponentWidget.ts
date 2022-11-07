import ComponentElement from "../element/ComponentElement"
import Widget from "./Widget"

class ComponentWidget extends Widget {
  createElement(): ComponentElement {
    return new ComponentElement(this)
  }
  build(): Widget {
    throw { message: "not implemented" }
  }
}

export default ComponentWidget
