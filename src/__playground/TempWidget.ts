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
      child: Column({
        children: [
          SizeBox({
            width: 10,
            height: 10,
            child: Container({
              width: Infinity,
              height: Infinity,
              color: "white",
              alignment: Alignment.center,
              child: Text("asdf", {
                textBaseline: "middle",
              }),
            }),
          }),
        ],
      }),
    })
  }
}

export default TempWidget
