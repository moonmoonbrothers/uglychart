import { StatelessElement, State, StatefulElement } from "../element";
import ComponentWidget from "./ComponentWidget";

class StatefulWidget extends ComponentWidget {
  createElement(): StatefulElement {
    return new StatefulElement(this);
  }

  createState(): State<StatefulWidget> {
    throw new Error("not implemented createState");
  }
}

export default StatefulWidget;
