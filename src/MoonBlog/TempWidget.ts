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
import ComponentWidget, {
  BuildContext,
} from "$lib/flutter/widget/ComponentWidget"
import type Widget from "$lib/flutter/widget/Widget"
import TempProvider from "./provider/TempProvider"

class TempWidget extends ComponentWidget {
  build(): Widget {
    return Container({
      width: Infinity,
      height: Infinity,
      color: "lightblue",
      alignment: Alignment.center,
      padding: EdgeInsets.all(20),
      child: TempProvider({
        value: { temp: "asdfaaasasdfasdf" },
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
              new Temp(),
            ],
          }),
        }),
      }),
    })
  }
}

class Temp extends ComponentWidget {
  override build(context: BuildContext): Widget {
    return Text(TempProvider.of(context).temp)
  }
}

export default TempWidget

// child: Container({
//   padding: EdgeInsets.all(16),
//   color: "#c0392b",
//   radius: Radius.all(8),
//   child: Text("Hello! It's Moon Blog", { style: { fontSize: "30px" } }),
// }),
