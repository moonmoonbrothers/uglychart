import Container from "$lib/flutter/component/Container"
import Flex from "$lib/flutter/component/Flex"
import FlexItem from "$lib/flutter/component/FlexItem"
import Text from "$lib/flutter/component/Text"
import ComponentWidget from "$lib/flutter/widget/ComponentWidget"
import type Widget from "$lib/flutter/widget/Widget"

class BarWidget extends ComponentWidget {
  build(): Widget {
    return new Container({
      width: Infinity,
      height: Infinity,
      style: {
        background: {
          color: "lightblue",
        },
      },
      child: new Flex({
        children: [
          new FlexItem({
            flex: 1,
            child: new Container({
              width: Infinity,
              style: {
                background: {
                  color: "green",
                },
              },
            }),
          }),
          new FlexItem({
            flex: 1,
            child: new Container({
              width: Infinity,
              style: {
                background: {
                  color: "orange",
                },
              },
            }),
          }),
          new FlexItem({
            flex: 1,
            child: new Container({
              width: Infinity,
              style: {
                background: {
                  color: "blue",
                },
              },
            }),
          }),
        ],
      }),
    })
  }
}

export default BarWidget
