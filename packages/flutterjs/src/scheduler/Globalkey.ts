import { BuildContext } from "../element";
import type BuildOwner from "./BuildOwner";
class GlobalKey {
  private buildOwner: BuildOwner;
  get currentContext(): BuildContext {
    return this.buildOwner.findByGlobalKey(this);
  }
}

export default GlobalKey;
