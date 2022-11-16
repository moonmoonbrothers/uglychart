import Expanded from "$lib/flutter/component/Expanded"
import { Builder, Container } from "$lib/flutter/component"
import EdgeInsets from "$lib/flutter/utils/edgeInsets"
import ComponentWidget, {
  BuildContext,
} from "$lib/flutter/widget/ComponentWidget"
import type Widget from "$lib/flutter/widget/Widget"
import TempProvider from "./provider/TempProvider"
import Column from "$lib/flutter/component/Column"
import Text from "$lib/flutter/component/Text"
import TempProvider2 from "./provider/TempProvider2"

class TempWidget extends ComponentWidget {
  build(): Widget {
    const a = Container({
      width: Infinity,
      height: Infinity,
      child: Column({
        children: [
          TempProvider2({
            value: { temp: "문대승" },
            child: Expanded({
              child: Container({
                padding: EdgeInsets.only({ top: 10 }),
                color: "red",
                child: Builder((context) => {
                  return Text({
                    text: TempProvider2.of(context).temp,
                    style: {
                      fontWeight: "700",
                      fontSize: "50px",
                    },
                  })
                }),
              }),
            }),
          }),
          Expanded({
            child: Container({
              padding: EdgeInsets.only({ top: 10 }),
              color: "blue",
              child: new LeafWidget(),
            }),
          }),
        ],
      }),
    })

    return TempProvider({
      value: { temp: "조문기" },
      child: a,
    })
  }
}

class LeafWidget extends ComponentWidget {
  build(context: BuildContext): Widget {
    return Text({
      text: TempProvider.of(context).temp,
      style: {
        fontColor: "white",
        fontSize: "50px",
      },
    })
  }
}

export default TempWidget
