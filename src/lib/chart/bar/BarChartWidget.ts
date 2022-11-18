import { SizedBox, Text } from "$lib/flutter/component"
import Align from "$lib/flutter/component/Align"
import Column from "$lib/flutter/component/Column"
import Container from "$lib/flutter/component/Container"
import Expanded from "$lib/flutter/component/Expanded"
import Flexible from "$lib/flutter/component/Flextible"
import Grid from "$lib/flutter/component/Grid"
import Alignment from "$lib/flutter/utils/alignment"
import EdgeInsets from "$lib/flutter/utils/edgeInsets"
import Gap from "$lib/flutter/utils/gap"
import ComponentWidget, {
  BuildContext,
} from "$lib/flutter/widget/ComponentWidget"
import type Widget from "$lib/flutter/widget/Widget"

class BarCharWidget extends ComponentWidget {
  override build(context: BuildContext): Widget {
    return Container({
      width: Infinity,
      height: Infinity,
      color: "orange",
      padding: EdgeInsets.symmetric({ horizontal: 20, vertical: 10 }),
      child: Column({
        children: [
          Text({ text: "Title" }),
          SizedBox({
            height: 10,
          }),
          Flexible({
            flex: 1,
            child: Container({
              color: "lightgrey",
              width: Infinity,
              height: Infinity,
              child: Grid({
                templateColumns: [Grid.ContentFit(), Grid.Fr(1)],
                templateRows: [Grid.Fr(1), Grid.ContentFit()],
                gap: Gap.all(0),
                childrenByRow: [
                  [
                    Container({
                      width: 50,
                      height: Infinity,
                      color: "red",
                    }),
                    Container({
                      width: Infinity,
                      height: Infinity,
                      color: "blue",
                    }),
                  ],
                  [
                    Container({
                      padding: EdgeInsets.all(3),
                      color: "white",
                      child: Text({ text: "AAA" }),
                    }),
                    Container({
                      height: 30,
                      width: Infinity,
                      color: "black",
                    }),
                  ],
                ],
              }),
            }),
          }),
        ],
      }),
    })
  }
}

export default BarCharWidget
