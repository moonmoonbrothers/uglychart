import { Container, Text } from "$lib/flutter/component/index"
import EdgeInsets from "$lib/flutter/utils/edgeInsets"
import ComponentWidget from "$lib/flutter/widget/ComponentWidget"
import type Widget from "$lib/flutter/widget/Widget"

class TempWidget extends ComponentWidget {
  build(): Widget {
    return Container({
      width: Infinity,
      height: Infinity,
      style: {
        background: {
          color: "lightblue",
        },
      },
      child: Container({
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
