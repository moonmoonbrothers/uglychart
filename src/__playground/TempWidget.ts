import {
  Container,
  Text,
  Center,
  Column,
  Flexible,
  Grid,
  Row,
  Transform,
} from "$lib/flutter/component"
import { EdgeInsets, BorderStyle, Radius, Gap, Offset } from "$lib/flutter/type"
import ComponentWidget from "$lib/flutter/widget/ComponentWidget"
import type Widget from "$lib/flutter/widget/Widget"

class TempWidget extends ComponentWidget {
  build(): Widget {
    const box = Container({
      color: "red",
      width: 50,
      height: 50,
    })
    return Container({
      width: Infinity,
      height: Infinity,
      padding: EdgeInsets.all(50),
      color: "lightgrey",
      child: Center({
        child: Transform.translate({
          offset: { x: -30, y: 60 },
          child: box,
        }),
      }),
    })
  }
}

export default TempWidget
