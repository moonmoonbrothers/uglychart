import {
  BuildContext,
  ComponentWidget,
  Provider,
  Widget,
  ReactiveChangeNotifier,
  ChangeNotifierProvider,
} from "@moonmoonbrothers/flutterjs";
import { DeepPartial } from "../utils";

class ChartContextRootWidget<
  CUSTOM,
  DEPENDENCIES,
  THEME,
  DATA,
  SCALE
> extends ComponentWidget {
  custom: CUSTOM;
  data: DATA;
  theme: THEME;
  scaleConfig?: DeepPartial<SCALE>;
  get dependencies(): DEPENDENCIES {
    throw new Error("Not implemented");
  }
  get root(): Widget {
    throw new Error("Not implemented");
  }
  constructor({
    custom = {},
    theme = {},
    data,
    scale,
  }: {
    custom?: Partial<CUSTOM>;
    theme?: DeepPartial<THEME>;
    data: DATA;
    scale?: DeepPartial<SCALE>;
  }) {
    super();
    this.custom = this.mergeWithDefaultCustom(custom);
    this.theme = this.mergeWithDefaultTheme(theme);
    this.data = data;
    this.scaleConfig = scale;
  }

  get scale(): SCALE {
    throw new Error("Not implemented");
  }

  mergeWithDefaultTheme(theme: DeepPartial<THEME>): THEME {
    throw new Error("not implemented");
  }

  mergeWithDefaultCustom(custom: Partial<CUSTOM>): CUSTOM {
    throw new Error("not implemented");
  }

  build(context: BuildContext): Widget {
    return ChangeNotifierProvider({
      providerKey: "THEME",
      create: () => ReactiveChangeNotifier(this.theme),
      child: ChangeNotifierProvider({
        providerKey: "DATA",
        create: () => ReactiveChangeNotifier(this.data),
        child: Provider({
          providerKey: "CUSTOM",
          value: this.custom,
          child: Provider({
            providerKey: "DEPENDENCIES",
            value: this.dependencies,
            child: Provider({
              providerKey: "SCALE",
              value: this.scale,
              child: this.root,
            }),
          }),
        }),
      }),
    });
  }
}

export default ChartContextRootWidget;
