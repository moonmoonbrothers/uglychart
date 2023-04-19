import { Provider, Widget } from "@moonmoonbrothers/flutterjs"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { Theme } from "../types"

const KEY = Symbol("THEME")
const ThemeProvider = ({
  child,
  theme,
}: {
  child: Widget
  theme: Required<Theme>
}) =>
  Provider({
    providerKey: KEY,
    child,
    value: theme,
  })

ThemeProvider.of = (context: BuildContext) => Provider.of<Required<Theme>>(KEY, context)

export default ThemeProvider
