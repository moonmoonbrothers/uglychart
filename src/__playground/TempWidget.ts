import { Container, Text } from "$lib/flutter/component/index"
import EdgeInsets from "$lib/flutter/utils/edgeInsets"
import ComponentWidget from "$lib/flutter/widget/ComponentWidget"
import type Widget from "$lib/flutter/widget/Widget"

class TempWidget extends ComponentWidget {
  build(): Widget {
    return Container({
      margin: EdgeInsets.all(0),
      width: Infinity,
      height: Infinity,
      style: {
        background: {
          color: "lightblue",
        },
      },
      child: Container({
      margin: EdgeInsets.all(30),
      style: {
        background: {
          color: "yellow",
        },
      },
        child: Text({
          text: "TEXT",
          style: {
            fontSize: "30px",
          },
        }),
      }),
    })
  }
}

export default TempWidget
