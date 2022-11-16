import Expanded from "$lib/flutter/component/Expanded"
import { Container } from "$lib/flutter/component"
import EdgeInsets from "$lib/flutter/utils/edgeInsets"
import ComponentWidget from "$lib/flutter/widget/ComponentWidget"
import type Widget from "$lib/flutter/widget/Widget"
import Row from "$lib/flutter/component/Row"

class TempWidget extends ComponentWidget {
  build(): Widget {
    const result = true
    console.log(result)
    return Container({
      width: Infinity,
      height: Infinity,
      padding: EdgeInsets.all(10),
      style: {
        background: {
          color: "black",
        },
      },
      child: Row({
        children: [
          Expanded({
            flex: 1,
            child: Container({
              style: {
                background: {
                  color: "blue",
                },
              },
            }),
          }),
          Expanded({
            flex: 1,
            child: Container({
              style: {
                background: {
                  color: "red",
                },
              },
            }),
          }),
          Expanded({
            child: Container({
              style: {
                background: {
                  color: "yellow",
                },
              },
            }),
          }),
        ],
      }),
    })
  }
}

export default TempWidget
