import {
  AppRunner,
  Container,
  Text,
  Alignment,
  Column,
  Expanded,
  type Widget,
  EdgeInsets,
  Grid,
  Row,
  Padding,
  Align,
} from "@moonmoonbrothers/flutterjs"

const BarChart = () => {
  return Container({
    width: Infinity,
    height: Infinity,
    alignment: Alignment.topLeft,
    padding: EdgeInsets.symmetric({ horizontal: 10 }),
    child: Column({
      children: [Title(), Chart()],
    }),
  })
}

export default BarChart

const Title = () =>
  Padding({
    child: Row({
      mainAxisAlignment: "spaceEvenly",
      children: [Text("Title")],
    }),
  })

const Chart = () => {
  return Align({
    alignment: Alignment.topCenter,
    child: Container({
      color: "green",
      width: 500,
      height: 300,
      child: Grid({
        templateColumns: [Grid.ContentFit(), Grid.Px(400)],
        templateRows: [Grid.Px(300), Grid.ContentFit()],
        childrenByRow: [
          [YAxisWrapper(), Plot()],
          [null, XAxisWrapper()],
        ],
      }),
    }),
  })
}

const Plot = () =>
  Container({
    color: "red",
    alignment: Alignment.center,
    height: Infinity,
    child: Text("어찌해야하오..", {
      style: { fontColor: "white", fontSize: "30px" },
    }),
  })

const XAxisWrapper = () =>
  Column({
    children: [
      Row({
        mainAxisAlignment: "spaceBetween",
        children: [Tick2(), Tick2(), Tick2(), Tick2(), Tick2()],
      }),
      Row({
        mainAxisAlignment: "spaceBetween",
        children: [
          XLabel({ text: "value1" }),
          XLabel({ text: "value2" }),
          XLabel({ text: "value3" }),
          XLabel({ text: "value4" }),
          XLabel({ text: "value5" }),
        ],
      }),
    ],
  })

const XLabel = ({ text }: { text: string }) =>
  Container({
    width: 0,
    child: Text(text, { textAlign: "middle" }),
  })

const Tick2 = () =>
  Container({
    height: 10,
    width: 2,
    color: "black",
  })

const YAxisWrapper = () =>
  Row({
    children: [
      Column({
        mainAxisAlignment: "spaceBetween",
        children: [Text("asdfasdf")],
      }),
      Column({
        mainAxisAlignment: "spaceBetween",
        children: [Tick(), Tick(), Tick()],
      }),
    ],
  })

const Tick = () =>
  Container({
    width: 10,
    height: 2,
    color: "black",
  })

const labelAxisWrapper = () => {}
