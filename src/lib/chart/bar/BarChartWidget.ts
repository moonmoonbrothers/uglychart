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
} from "$lib/flutter/component"
import { Alignment, BorderStyle, Gap } from "$lib/flutter/type"
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
          Text("Profile of Neuropsychological Tests", {
            style: {
              fontSize: "19px",
              fontWeight: "700",
              fontFamily: "Arial",
            },
          }),
          SizedBox({
            height: 22,
          }),
          Flexible({
            flex: 1,
            fit: "loose",
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
          }),
        ],
      }),
    })
  }
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
            children: [
              ColumnExpanded(0.5),
              yTick(),
              ColumnExpanded(),
              yTick(),
              ColumnExpanded(),
              yTick(),
              ColumnExpanded(),
              yTick(),
              ColumnExpanded(),
              yTick(),
              ColumnExpanded(),
              yTick(),
              ColumnExpanded(0.5),
            ],
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
          children: [
            XTick(),
            XTick(),
            XTick(),
            XTick(),
            XTick(),
            XTick(),
            XTick(),
            XTick(),
            XTick(),
            XTick(),
          ],
        }),
        SizedBox({ height: 5 }),
        Row({
          children: [
            XLabel(0),
            RowExpanded(1),
            XLabel(0),
            RowExpanded(1),
            XLabel(0),
            RowExpanded(1),
            XLabel(0),
            RowExpanded(1),
            XLabel(0),
            RowExpanded(1),
            XLabel(0),
            RowExpanded(1),
            XLabel(0),
            RowExpanded(1),
            XLabel(0),
            RowExpanded(1),
            XLabel(0),
            RowExpanded(1),
            XLabel(0),
          ],
        }),
      ],
    }),
  })
}

function Plot() {
  return Container({
    color: "white",
    border: BorderStyle.all({
      thickness: 1,
    }),
    child: SizedBox({
      height: 254,
      width: 506,
      child: Column({
        mainAxisAlignment: "spaceAround",
        children: [Bar(), Bar(), Bar(), Bar(), Bar(), Bar()],
      }),
    }),
  })
}

function Bar() {
  return Row({
    children: [
      Flexible({
        flex: 70,
        child: Container({
          width: Infinity,
          height: 10,
          color: "green",
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

function yTick({ width = 10 }: { width?: number } = {}) {
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
