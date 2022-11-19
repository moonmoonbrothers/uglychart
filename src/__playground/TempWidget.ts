import {
  Container,
  Text,
  Center,
  Column,
  Flexible,
  Grid,
  Row,
} from "$lib/flutter/component"
import { EdgeInsets, BorderStyle, Radius, Gap } from "$lib/flutter/type"
import ComponentWidget from "$lib/flutter/widget/ComponentWidget"
import type Widget from "$lib/flutter/widget/Widget"

class TempWidget extends ComponentWidget {
  build(): Widget {
    const grid = Grid({
      templateColumns: [Grid.ContentFit()],
      templateRows: [Grid.ContentFit()],
      childrenByRow: [
        [
          Container({
            width: 400,
            height: 300,
            color: "lightgrey",
            child: Column({
              children: [
                Row({
                  children: [
                    Flexible({
                      flex: 70,
                      child: Container({
                        width: Infinity,
                        height: 20,
                        color: "green",
                      }),
                    }),
                    Flexible({
                      flex: 30,
                      child: Container({
                        width: Infinity,
                        height: 20,
                        color: "red",
                      }),
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      ],
    })
    return Container({
      width: Infinity,
      height: Infinity,
      child: grid,
    })
  }
}

const RowExpaned = () =>
  Flexible({
    child: Container({
      width: Infinity,
    }),
  })

export default TempWidget
