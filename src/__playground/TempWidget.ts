import Column from "$lib/flutter/component/Column"
import Expanded from "$lib/flutter/component/Expanded"
import { Container, Padding, Text } from "$lib/flutter/component/index"
import EdgeInsets from "$lib/flutter/utils/edgeInsets"
import ComponentWidget from "$lib/flutter/widget/ComponentWidget"
import type Widget from "$lib/flutter/widget/Widget"

class TempWidget extends ComponentWidget {
  build(): Widget {
    return Container({
      width: Infinity,
      height: Infinity,
      padding: EdgeInsets.all(10),
      margin: EdgeInsets.symmetric({ horizontal: 100 }),
      style: {
        background: {
          color: "lightblue",
        },
      },
      child: Column({
        children: [
          Expanded({
            flex: 1,
            child: Container({
              child: Text({ text: "asdf" }),
              padding: EdgeInsets.all(10),
              style: {
                background: {
                  color: "red",
                },
              },
            }),
          }),
          Container({
            child: Text({ text: "aldnkf" }),
            margin: EdgeInsets.only({left: 60, top: 10, bottom: 10})
          }),
          Expanded({
            child: Container({
              style: {
                background: {
                  color: "black",
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
