import { BuildContext, State } from "../element";
import { StatefulWidget, Widget } from "../widget";
import ChangeNotifier from "./ChangeNotifier";
import Provider from "./Provider";

class ChangeNotifierProvider extends StatefulWidget {
  child: Widget;
  create: () => ChangeNotifier;
  providerKey: any;
  constructor({
    child,
    create,
    key,
    providerKey,
  }: {
    child: Widget;
    create: () => ChangeNotifier;
    key?: string;
    providerKey: any;
  }) {
    super(key);
    this.child = child;
    this.create = create;
    this.providerKey = providerKey;
  }

  createState(): ChangeNotifierProviderState {
    return new ChangeNotifierProviderState();
  }
}

class ChangeNotifierProviderState extends State<ChangeNotifierProvider> {
  value: ChangeNotifier;
  initState(context: BuildContext): void {
    this.value = this.widget.create();
    this.value.addListener(() => {
      this.setState();
    });
  }

  build(context: BuildContext): Widget {
    return Provider({
      child: this.widget.child,
      value: this.value,
      providerKey: this.widget.providerKey,
    });
  }
}

export default (
  ...props: ConstructorParameters<typeof ChangeNotifierProvider>
) => new ChangeNotifierProvider(...props);

class A<T> {
  constructor(public args: T) {}
}
