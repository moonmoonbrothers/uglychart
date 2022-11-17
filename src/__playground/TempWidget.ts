import { Container } from "$lib/flutter/component"
import EdgeInsets from "$lib/flutter/utils/edgeInsets"
import ComponentWidget from "$lib/flutter/widget/ComponentWidget"
import type Widget from "$lib/flutter/widget/Widget"
import Grid from "$lib/flutter/component/Grid"
import Alignment from "$lib/flutter/utils/alignment"
import Gap from "$lib/flutter/utils/gap"
import Text from "$lib/flutter/component/Text"

class TempWidget extends ComponentWidget {
  build(): Widget {
    return Container({
      width: Infinity,
      height: Infinity,
      color: "lightblue",
      padding: EdgeInsets.all(10),
      child: Grid({
        gap: Gap.only({ x: 10, y: 10 }),
        alignment: Alignment.topRight,
        templateColumns: [
          ...Grid.ContentFit().repeat(2),
          Grid.Fr(1),
          Grid.Fr(2),
        ],
        templateRows: Grid.ContentFit().repeat(2),
        childrenByRow: [
          [
            Container({
              width: 50,
              height: 50,
              color: "black",
            }),
            Text({
              text: "Hel",
              style: {
                fontSize: "100px",
              },
            }),
            Container({
              width: 100,
              height: 50,
              color: "red",
            }),
            Container({
              width: 50,
              height: 50,
              color: "black",
            }),
            Container({
              width: 50,
              height: 50,
              color: "black",
            }),
          ],
          [
            Container({
              width: 50,
              height: 50,
              color: "blue",
            }),
            Container({
              width: 150,
              height: 50,
              color: "purple",
            }),
            Container({
              width: Infinity,
              height: 50,
              color: "yellow",
            }),
          ],
          [
            Container({
              width: 50,
              height: 50,
              color: "blue",
            }),
            Container({
              width: 50,
              height: 70,
              color: "black",
            }),
            Container({
              width: Infinity,
              height: Infinity,
              color: "white",
            }),
          ],
        ],
      }),
    })
  }
}

export default TempWidget
