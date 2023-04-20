import {
  BuildContext,
  ComponentWidget,
  Provider,
  Widget,
} from "@moonmoonbrothers/flutterjs";

class ChartContextRootWidget<
  CUSTOM,
  DEPENDENCIES extends Record<string, (...arg: any) => Widget>,
  THEME,
  DATA,
> extends ComponentWidget {
  custom: CUSTOM;
  data: DATA;
  theme: THEME;
  get dependencies(): DEPENDENCIES {
    throw new Error("Not implemented");
  }
  get root(): Widget {
    throw new Error("Not implemented");
  }
  constructor({
    custom,
    theme,
    data,
  }: {
    custom: CUSTOM;
    theme: Partial<THEME>;
    data: DATA;
  }) {
    super();
    this.custom = this.mergeWithDefaultCustom(custom);
    this.theme = this.mergeWithDefaultTheme(theme);
    this.data = data;
  }

  mergeWithDefaultTheme(theme: Partial<THEME>): THEME {
    throw new Error("not implemented");
  }

  mergeWithDefaultCustom(custom: Partial<CUSTOM>): CUSTOM {
    throw new Error("not implemented");
  }

  build(context: BuildContext): Widget {
    return Provider({
      providerKey: "THEME",
      value: {
        theme: this.theme,
      },
      child: Provider({
        providerKey: "DATA",
        value: {
          data: this.data,
        },
        child: Provider({
          providerKey: "CUSTOM",
          value: {
            custom: this.custom,
          },
          child: Provider({
            providerKey: "DEPENDENCIES",
            value: this.dependencies,
            child: this.root,
          }),
        }),
      }),
    });
  }
}

export default ChartContextRootWidget;
