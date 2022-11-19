import { Container, Text } from "$lib/flutter/component"
import EdgeInsets from "$lib/flutter/utils/edgeInsets"
import ComponentWidget from "$lib/flutter/widget/ComponentWidget"
import type Widget from "$lib/flutter/widget/Widget"
import Grid from "$lib/flutter/component/Grid"
import Alignment from "$lib/flutter/utils/alignment"
import BorderStyle from "$lib/flutter/utils/borderstyle"
import Center from "$lib/flutter/component/Center"
import Radius from "$lib/flutter/utils/radius"
import Column from "$lib/flutter/component/Column"
import Expanded from "$lib/flutter/component/Expanded"
import SizeBox from "$lib/flutter/component/SizedBox"
import Gap from "$lib/flutter/utils/gap"
import Row from "$lib/flutter/component/Row"
import { children } from "svelte/internal"
import Flexible from "$lib/flutter/component/Flextible"

class TempWidget extends ComponentWidget {
  build(): Widget {
    return Container({
      color: "lightgrey",
      width: Infinity,
      height: Infinity,
      child: Grid({
        templateColumns: [Grid.ContentFit(), Grid.Fr(1)],
        templateRows: [Grid.Fr(1), Grid.ContentFit()],
        alignment: Alignment.topLeft,
        childrenByRow: [
          [
            Row({
              children: [
                Container({
                  color: "purple",
                  child: Column({
                    crossAxisAlignment: "start",
                    children: [
                      Flexible({
                        flex: 1,
                        child: Container({
                          height: Infinity,
                        }),
                      }),
                      Text({ text: "Attention" }),
                      Flexible({
                        flex: 1,
                        child: Container({
                          height: Infinity,
                        }),
                      }),
                      Text({ text: "Attention" }),
                      Flexible({
                        flex: 1,
                        child: Container({
                          height: Infinity,
                        }),
                      }),
                      Text({ text: "Attention" }),
                      Flexible({
                        flex: 1,
                        child: Container({
                          height: Infinity,
                        }),
                      }),
                      Text({ text: "Attention" }),
                      Flexible({
                        flex: 1,
                        child: Container({
                          height: Infinity,
                        }),
                      }),
                      Text({ text: "Attention" }),
                      Flexible({
                        flex: 1,
                        child: Container({
                          height: Infinity,
                        }),
                      }),
                      Text({ text: "Attention" }),
                    ],
                  }),
                }),
                Container({
                  color: "grey",
                  child: Column({
                    children: [
                      Text({ text: " asd" }),
                      Container({
                        width: 10,
                        height: 10,
                        color: "black",
                        border: BorderStyle.only({
                          bottom: { thickness: 2, color: "black" },
                        }),
                      }),
                    ],
                  }),
                }),
              ],
            }),
            Container({
              color: "blue",
              height: 100,
              width: 100,
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
    })
  }
}

export default TempWidget
