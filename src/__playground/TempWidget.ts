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
import { children, text } from "svelte/internal"
import Flexible from "$lib/flutter/component/Flextible"

class TempWidget extends ComponentWidget {
  build(): Widget {
    return Container({
      color: "lightgrey",
      width: Infinity,
      height: Infinity,
      child: Center({
        child: Column({
          mainAxisAlignment: "spaceAround",
          children: [
            Container({
              width: 50,
              height: 50,
              color: "red",
            }),
            Container({
              width: 50,
              height: 50,
              color: "blue",
            }),
            Container({
              width: 50,
              height: 50,
              color: "orange",
            }),
          ],
        }),
      }),
    })
  }
}

export default TempWidget
