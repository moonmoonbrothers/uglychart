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
  DATA
> extends ComponentWidget {
  custom: CUSTOM;
  data: DATA;
  theme: THEME;
  child: Widget;
  constructor({
    custom,
    theme,
    data,
    child,
  }: {
    custom: CUSTOM;
    theme: THEME;
    data: DATA;
    child: Widget;
  }) {
    super();
    this.custom = custom;
    this.theme = theme;
    this.data = data;
    this.child = child;
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
            child: this.child,
          }),
        }),
      }),
    });
  }

  get dependencies(): DEPENDENCIES {
    throw Error("Not implemented: injectDependencies");
  }
}

export default ChartContextRootWidget;
