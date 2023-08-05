import { StatelessElement, State } from "../element";
import ComponentWidget from "./ComponentWidget";

class StatefulWidget extends ComponentWidget {
  createElement(): StatelessElement {
    return new StatelessElement(this);
  }

  createState(): State<this> {
    throw new Error("must implemented");
  }
}

export default StatefulWidget;
