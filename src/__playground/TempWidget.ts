import { Container, Text } from "$lib/flutter/component"
import EdgeInsets from "$lib/flutter/utils/edgeInsets"
import ComponentWidget from "$lib/flutter/widget/ComponentWidget"
import type Widget from "$lib/flutter/widget/Widget"
import Grid from "$lib/flutter/component/Grid"
import Alignment from "$lib/flutter/utils/alignment"
import BorderStyle from "$lib/flutter/utils/borderstyle"
import Center from "$lib/flutter/component/Center"
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
              width: 150,
              height: 150,
              color: "white",
              radius: Radius.only({
                bttomRight: 10,
              }),
              border: BorderStyle.only({
                top: {
                  color: "black",
                  thickness: 10,
                },
                left: {
                  color: "black",
                  thickness: 2,
                },
                right: {
                  color: "blue",
                  thickness: 20,
                },
                bottom: {
                  color: "yellow",
                  thickness: 20,
                },
              }),
              child: Center({
                child: Text({
                  text: "asdf",
                }),
              }),
            }),
          ],
        ],
      }),
    })
  }
}

export default TempWidget
