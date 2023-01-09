import ComponentWidget, { BuildContext } from "../widget/ComponentWidget"
import type Widget from "../widget/Widget"

function Builder(builder: (context: BuildContext) => Widget) {
  return new _Builder(builder)
}

class _Builder extends ComponentWidget {
  builder: (context: BuildContext) => Widget
  constructor(builder: (context: BuildContext) => Widget) {
    super()
    this.builder = builder
  }
  override build(context: BuildContext): Widget {
    return this.builder(context)
  }
}

export default Builder
