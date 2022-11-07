import type Element from "../element/Element"

class Widget {
  createElement(): Element {
    throw { message: "not implemented" }
  }
}

export default Widget
