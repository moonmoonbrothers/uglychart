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
import { GridTemplate } from "$lib/flutter/component/base/BaseGrid"
import SizeBox from "$lib/flutter/component/SizedBox"
import {
  EdgeInsets,
  BorderStyle,
  Radius,
  Gap,
  Offset,
  Alignment,
} from "$lib/flutter/type"
import ComponentWidget from "$lib/flutter/widget/ComponentWidget"
import type Widget from "$lib/flutter/widget/Widget"

class TempWidget extends ComponentWidget {
  build(): Widget {
    return Container({
      width: Infinity,
      height: Infinity,
      color: "lightblue",
      alignment: Alignment.center,
      padding: EdgeInsets.all(20),
      child: Container({
        child: Column({
          children: [
            Container({
              width: 50,
              height: 50,
              color: "",
            }),
            SizeBox({
              height: 30,
            }),
            Container({
              width: 50,
              height: 50,
              color: "blue",
            }),
          ],
        }),
      }),
    })
  }
}

export default TempWidget
