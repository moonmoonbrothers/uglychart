import {
  SizedBox,
  Text,
  Align,
  Column,
  Container,
  Expanded,
  Flexible,
  Grid,
  Row,
  Transform,
} from "$lib/flutter/component"
import {
  Alignment,
  BorderStyle,
  EdgeInsets,
  Gap,
  Radius,
} from "$lib/flutter/type"
import Utils from "$lib/flutter/utils"
import ComponentWidget, {
  BuildContext,
} from "$lib/flutter/widget/ComponentWidget"
import type Widget from "$lib/flutter/widget/Widget"

class BarCharWidget extends ComponentWidget {
  override build(context: BuildContext): Widget {
    return Container({
      width: Infinity,
      height: Infinity,
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
      color: "lightgrey",
      height: Infinity,
      child: Grid({
        templateColumns: [Grid.ContentFit(), Grid.ContentFit()],
        templateRows: [Grid.ContentFit(), Grid.ContentFit()],
        gap: Gap.all(0),
        childrenByRow: [
          [YAxis(), Plot()],
          [null, XAxis()],
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
    border: BorderStyle.only({
      bottom: {
        color: "rgba(0,0,0,0)",
        thickness: 1,
      },
    }),
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
    width: Infinity,
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
        flex: 70,
        child: Row({
          children: [
            Container({
              width: Infinity,
              height: 10,
              color: "green",
            }),
            Container({
              alignment: Alignment.centerLeft,
              child: Transform.translate({
                offset: { x: 5 },
                child: Container({
                  color: "grey",
                  radius: Radius.all(5),
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
      RowExpanded(30),
    ],
  })
}

function YLabel() {
  return Container({
    child: Text("dsc", {
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
    alignment: Alignment.center,
    child: SizedBox({
      width: 0,
      height: 10,
      child: Text(`${value}`, {
        textAlign: "center",
        style: {
          fontSize: "10px",
        },
      }),
    }),
  })
}

function ColumnExpanded(flex = 1) {
  return Flexible({
    flex,
    child: Container({
      height: Infinity,
    }),
  })
}

function RowExpanded(flex = 1) {
  return Flexible({
    flex,
    child: Container({
      width: Infinity,
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
    child: Container({
      height,
      border: BorderStyle.only({
        left: { thickness: 1, color: "black" },
      }),
    }),
  })
}

export default BarCharWidget
