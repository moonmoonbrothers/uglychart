import {
  Offset,
  Widget,
  StatefulWidget,
  Element,
  Column,
  MainAxisAlignment,
  MainAxisSize,
  Row,
  Transform,
  SizedBox,
  GlobalKey,
  State,
  Matrix4,
  Stack,
  CustomPaint,
  Size,
  Path,
  Padding,
  EdgeInsets,
} from "@moonmoonbrothers/flutterjs";
import { functionalizeClass } from "../utils";
import { Draggable } from "./components";

class Temp extends StatefulWidget {
  content: Widget;
  childNodes: Widget[];
  constructor({
    key,
    childNodes,
    content,
  }: {
    key?: any;
    content: Widget;
    childNodes: Widget[];
  }) {
    super(key);
    this.content = content;
    this.childNodes = childNodes;
  }
  createState(): State<StatefulWidget> {
    return new TempState();
  }
}

class TempState extends State<Temp> {
  vortextPosition: Offset;
  childVortextPositions: Offset[];
  vortexKey: GlobalKey;
  childVortextKeys: GlobalKey[];

  didChangePosition() {
    if (this.element == null) return;
    this.element.scheduler.addPostFrameCallbacks(() => {
      this.setState(() => {
        const origin = matrixToOffset(this.element.renderObject.matrix);
        this.vortextPosition = matrixToOffset(
          this.vortexKey.currentContext.renderObject.matrix
        ).minus(origin);
        this.childVortextPositions = this.childVortextKeys.map(
          ({ currentContext }) =>
            matrixToOffset(currentContext.renderObject.matrix).minus(origin)
        );
      });
    });
  }
  initState(context: Element): void {
    super.initState(context);
    this.vortexKey = new GlobalKey();
    this.childVortextKeys = this.widget.childNodes.map(() => new GlobalKey());
    this.didChangePosition();
  }

  build(context: Element): Widget {
    const { content, childNodes } = this.widget;

    return Stack({
      children: [
        CustomPaint({
          size: Size.infinite,
          painter: {
            createDefaultSvgEl(context) {
              return {
                path: context.createSvgEl("path"),
              };
            },
            paint: ({ path }, size) => {
              if (
                this.childVortextPositions == null ||
                this.vortextPosition == null
              )
                return;

              const painter = new Path();
              this.childVortextPositions.forEach((childPosition) => {
                painter.moveTo(this.vortextPosition).lineTo(childPosition);
              });
              path.setAttribute("stroke-width", "2");
              path.setAttribute("stroke", "black");
              path.setAttribute("d", painter.getD());
            },
          },
        }),
        Column({
          mainAxisAlignment: MainAxisAlignment.center,
          mainAxisSize: MainAxisSize.min,
          children: [
            Draggable({
              onDrag: () => {
                this.didChangePosition();
              },
              child: Column({
                mainAxisSize: MainAxisSize.min,
                children: [content, Vortex({ key: this.vortexKey })],
              }),
            }),
            SizedBox({ height: 30 }),
            Row({
              mainAxisSize: MainAxisSize.min,
              children: this.childVortextKeys.map((key, i) =>
                Column({
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Vortex({ key }),
                    Padding({
                      padding: EdgeInsets.symmetric({ horizontal: 10 }),
                      child: childNodes[i],
                    }),
                  ],
                })
              ),
            }),
          ],
        }),
      ],
    });
  }
}

function Vortex({ key }: { key: GlobalKey }) {
  return SizedBox({ width: 0, height: 0, key });
}

function matrixToOffset(matrix: Matrix4) {
  return new Offset({
    x: matrix.storage[12],
    y: matrix.storage[13],
  });
}

export default functionalizeClass(Temp);
