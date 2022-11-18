import { Container } from "$lib/flutter/component"
import EdgeInsets from "$lib/flutter/utils/edgeInsets"
import ComponentWidget from "$lib/flutter/widget/ComponentWidget"
import type Widget from "$lib/flutter/widget/Widget"
import Grid from "$lib/flutter/component/Grid"
import Alignment from "$lib/flutter/utils/alignment"
import BorderStyle from "$lib/flutter/utils/borderstyle"
import Radius from "$lib/flutter/utils/radius"

class TempWidget extends ComponentWidget {
  build(): Widget {
    return Container({
      width: Infinity,
      height: Infinity,
      color: "lightblue",
      padding: EdgeInsets.all(10),
      child: Grid({
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
              radius: Radius.all(10),
              border: BorderStyle.all({
                thickness: 5,
                color: "black",
              }),
            }),
          ],
        ],
      }),
    })
  }
}

export default TempWidget
