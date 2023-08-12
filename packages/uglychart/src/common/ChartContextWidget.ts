import {
  ComponentWidget,
  BuildContext,
  Provider,
  Widget,
} from "@moonmoonbrothers/flutterjs";
class ChartContextWidget<
  CUSTOM,
  DEPENDENCIES extends Record<string, (...arg: any) => Widget>,
  THEME,
  DATA,
  SCALE
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

  getScale(context: BuildContext): SCALE {
    return Provider.of("SCALE", context);
  }
}

export default ChartContextWidget;
