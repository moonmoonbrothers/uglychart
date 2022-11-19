import { Container, Text, Center, Column } from "$lib/flutter/component"
import { EdgeInsets, BorderStyle, Radius, Gap } from "$lib/flutter/type"
import ComponentWidget from "$lib/flutter/widget/ComponentWidget"
import type Widget from "$lib/flutter/widget/Widget"

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
