import { Widget } from "@moonmoonbrothers/flutterjs";
import { functionalizeClass } from "../utils";

export class Node {
  content: Widget;
  childNodes: Node[] = [];

  constructor(content: Widget) {
    this.content = content;
  }

  addChildNode(node: Node) {
    this.childNodes.push(node);
    return this;
  }
}

export default functionalizeClass(Node);
