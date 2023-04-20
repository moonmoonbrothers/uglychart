import {
  ComponentWidget,
  BuildContext,
  Provider,
  Widget,
} from "@moonmoonbrothers/flutterjs";
class ChartContextWidget<
  DATA,
  DEPENDENCIES extends Record<string, (...arg: any) => Widget>,
  CUSTOM,
  THEME
> extends ComponentWidget {
  getData(context: BuildContext): DATA {
    return Provider.of("DATA", context);
  }

  getCustom(context: BuildContext): CUSTOM {
    return Provider.of("CUSTOM", context);
  }

  getTheme(context: BuildContext): THEME {
    return Provider.of("THEME", context);
  }

  getDependencies(context: BuildContext): DEPENDENCIES {
    return Provider.of("DEPENDENCIES", context);
  }
}

export default ChartContextWidget;
