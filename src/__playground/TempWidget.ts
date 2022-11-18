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

class TempWidget extends ComponentWidget {
  build(): Widget {
    return Container({
      radius: Radius.all(5),
      border: BorderStyle.all({ color: "black", thickness: 2 }),
      width: Infinity,
      height: 0,
      color: "lightblue",
      margin: EdgeInsets.all(10),
      padding: EdgeInsets.all(10),
      child: Column({
        crossAxisAlignment: "stretch",
        mainAxisAlignment: "end",
        children: [
          Container({
            width: 50,
            height: 50,
            color: "blue",
          }),
          Container({
            width: 50,
            height: 50,
            color: "yellow",
          }),
        ],
      }),
    })
  }
}

export default TempWidget
