import {
  SizedBox,
  Text,
  Column,
  Container,
  Flexible,
  Grid,
  Row,
  Transform,
  Alignment,
  BorderStyle,
  EdgeInsets,
  Radius,
  Utils,
  ComponentWidget,
  type Widget,
} from "@moonmoonbrothers/like-flutter"

class BarCharWidget extends ComponentWidget {
  override build(): Widget {
    return Container({
      width: Infinity,
      height: Infinity,
      padding: EdgeInsets.all(10),
      alignment: Alignment.center,
      color: "lightgrey",
      child: Column({
        children: [
          Title(),
          SizedBox({
            height: 22,
          }),
          Chart(),
        ],
      }),
    })
  }
}

function Chart() {
  return Flexible({
    flex: 1,
    child: Container({
      height: Infinity,
      alignment: Alignment.topRight,
      child: Grid({
        templateColumns: [
          Grid.Fr(1),
          Grid.ContentFit(),
          Grid.ContentFit(),
          Grid.Fr(1),
        ],
        templateRows: [Grid.ContentFit(), Grid.ContentFit()],
        childrenByRow: [
          [null, YAxis(), Plot(), null],
          [null, null, XAxis(), null],
        ],
      }),
    }),
  })
}

function Title() {
  return Text("Profile of Neuropsychological Tests", {
    style: {
      fontSize: "19px",
      fontWeight: "700",
      fontFamily: "Arial",
    },
  })
}

function YAxis() {
  return Container({
    alignment: Alignment.center,
    child: Row({
      children: [
        Container({
          child: Column({
            crossAxisAlignment: "start",
            mainAxisAlignment: "spaceAround",
            children: [
              YLabel(),
              YLabel(),
              YLabel(),
              YLabel(),
              YLabel(),
              YLabel(),
            ],
          }),
        }),
        SizedBox({ width: 10 }),
        Container({
          child: Column({
            mainAxisAlignment: "spaceAround",
            children: Utils.repeat(YTick(), 6),
          }),
        }),
      ],
    }),
  })
}

function XAxis() {
  return Container({
    height: 30,
    alignment: Alignment.center,
    child: Column({
      children: [
        Row({
          mainAxisAlignment: "spaceBetween",
          children: [...Utils.repeat(XTick(), 11)],
        }),
        SizedBox({ height: 5 }),
        Row({
          mainAxisAlignment: "spaceBetween",
          children: Array.from({ length: 11 }, (_, i) => i * 10).map(XLabel),
        }),
      ],
    }),
  })
}

function Plot() {
  return Container({
    color: "white",
    height: 254,
    width: 506,
    border: BorderStyle.all({
      thickness: 1,
    }),
    alignment: Alignment.center,
    child: Column({
      mainAxisAlignment: "spaceAround",
      children: [Bar(), Bar(), Bar(), Bar(), Bar(), Bar()],
    }),
  })
}

function Bar() {
  return Row({
    children: [
      Flexible({
        flex: 80.0,
        child: Row({
          children: [
            Container({
              width: Infinity,
              height: 9,
              color: "lightblue",
            }),
            Container({
              child: Transform.translate({
                offset: { x: 5 },
                child: Container({
                  color: "white",
                  radius: Radius.all(4),
                  padding: EdgeInsets.symmetric({ horizontal: 5, vertical: 3 }),
                  child: Text("70.00", {
                    style: {
                      fontSize: "8px",
                    },
                  }),
                }),
              }),
            }),
          ],
        }),
      }),
      Flexible({
        flex: 5,
        child: Container({
          width: Infinity,
          alignment: Alignment.center,
        }),
      }),
    ],
  })
}

function YLabel() {
  return Container({
    child: Text("daaszasf", {
      style: {
        fontSize: "16px",
      },
    }),
  })
}

function XLabel(value: number) {
  return Container({
    width: 1,
    height: 10,
    child: SizedBox({
      width: 0,
      height: 10,
      child: Text(`${value}`, {
        textAlign: "middle",
        style: {
          fontSize: "10px",
        },
      }),
    }),
  })
}

function YTick({ width = 10 }: { width?: number } = {}) {
  return Container({
    child: Container({
      width,
      height: 1,
      color: "black",
    }),
  })
}

function XTick({ height = 10 }: { height?: number } = {}) {
  return Container({
    height,
    width: 1,
    color: "black",
  })
}

export default BarCharWidget
