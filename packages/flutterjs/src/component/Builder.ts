import StatelessWidget from "../widget/ComponentWidget";
import { BuildContext } from "../widget/ComponentWidget";
import type Widget from "../widget/Widget";

function Builder(...props: ConstructorParameters<typeof _Builder>) {
  return new _Builder(...props);
}

class _Builder extends StatelessWidget {
  builder: (context: BuildContext) => Widget;
  constructor({
    builder,
    key,
  }: {
    builder: (context: BuildContext) => Widget;
    key?: any;
  }) {
    super(key);
    this.builder = builder;
  }
  override build(context: BuildContext): Widget {
    return this.builder(context);
  }
}

export default Builder;
