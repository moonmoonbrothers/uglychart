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

class TempWidget extends ComponentWidget {
  build(): Widget {
    return Container({
      color: "lightgrey",
      child: Container({
        color: "lightgrey",
        width: Infinity,
        height: Infinity,
        child: Grid({
          templateColumns: [Grid.ContentFit(), Grid.Fr(1)],
          templateRows: [Grid.Fr(1), Grid.ContentFit()],
          gap: Gap.all(5),
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
                color: "lightblue",
                width: 30,
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
    })
  }
}

export default TempWidget
