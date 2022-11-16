import Expanded from "$lib/flutter/component/Expanded"
import { Container } from "$lib/flutter/component"
import EdgeInsets from "$lib/flutter/utils/edgeInsets"
import ComponentWidget, {
  BuildContext,
} from "$lib/flutter/widget/ComponentWidget"
import type Widget from "$lib/flutter/widget/Widget"
import TempProvider from "./provider/TempProvider"
import Provider from "$lib/flutter/provider"
import Column from "$lib/flutter/component/Column"
import Text from "$lib/flutter/component/Text"

class TempWidget extends ComponentWidget {
  build(): Widget {
    const a = Container({
      width: Infinity,
      height: Infinity,
      child: Column({
        children: [
          Expanded({
            child: Container({
              color: "red",
            }),
          }),
          Container({
            color: "blue",
            child: new LeafWidget(),
          }),
        ],
      }),
    })

    return TempProvider({
      value: { temp: "asdf" },
      child: a,
    })
  }
}

class LeafWidget extends ComponentWidget {
  build(context: BuildContext): Widget {
    return Text({
      text: TempProvider.of(context).temp,
    })
  }
}

export default TempWidget
