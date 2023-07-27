import ComponentElement from "../element/ComponentElement";
import Element from "../element/Element";
import Widget from "./Widget";

class ComponentWidget extends Widget {
  createElement(): ComponentElement {
    return new ComponentElement(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  initState(context: BuildContext): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  build(context: BuildContext): Widget {
    throw { message: "not implemented" };
  }
}

export class BuildContext extends Element {}

export default ComponentWidget;
