import { ComponentElement, StatelessElement } from "../element";
import ComponentWidget from "./ComponentWidget";

class StatelessWidget extends ComponentWidget {
  createElement(): StatelessElement {
    return new StatelessElement(this);
  }
}

export default StatelessWidget;
