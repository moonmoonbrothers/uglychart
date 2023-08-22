import {
  Offset,
  Widget,
  StatefulWidget,
  Element,
  Column,
  MainAxisAlignment,
  MainAxisSize,
  Row,
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
  StackFit,
  VoidCallback,
  CrossAxisAlignment,
  Draggable,
} from "@moonmoonbrothers/flutterjs";
import { functionalizeClass } from "../utils";
import { Node } from "./Node";
import pathPatiner from "./pathPatiner";

class Diagram extends StatefulWidget {
  node: Node;
  vortex: Widget;
  onPositionChange: VoidCallback;
  constructor({
    key,
    node,
    onPositionChange = () => {},
    vortex,
  }: {
    key?: any;
    node: Node;
    onPositionChange?: VoidCallback;
    vortex?: Widget;
  }) {
    super(key);
    this.node = node;
    this.onPositionChange = onPositionChange;
    this.vortex = vortex ?? SizedBox.shrink();
  }
  createState(): State<StatefulWidget> {
    return new DiagramState();
  }
}

class DiagramState extends State<Diagram> {
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
    this.childVortextKeys = this.widget.node.childNodes.map(
      () => new GlobalKey()
    );
    this.didChangePosition();
  }

  build(context: Element): Widget {
    const { content, childNodes } = this.widget.node;

    return Stack({
      fit: StackFit.loose,
      children: [
        CustomPaint({
          painter: {
            dependencies: {
              childVortextPositions: this.childVortextPositions,
              vortextPosition: this.vortextPosition,
            },
            shouldRepaint: ({ dependencies }) => {
              if (dependencies == null) return true;

              return (
                dependencies.childVortextPositions !==
                  this.childVortextPositions ||
                dependencies.vortextPosition !== this.vortextPosition
              );
            },
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
                pathPatiner({
                  from: this.vortextPosition,
                  to: childPosition,
                  path: painter,
                });
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
              onDragUpdate: () => {
                this.didChangePosition();
                this.widget.onPositionChange();
              },
              child: Column({
                mainAxisSize: MainAxisSize.min,
                children: [
                  this.widget.vortex,
                  Padding({
                    padding: EdgeInsets.symmetric({ horizontal: 10 }),
                    child: content,
                  }),
                  Vortex({ key: this.vortexKey }),
                ],
              }),
            }),
            SizedBox({ height: 30 }),
            Row({
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: this.childVortextKeys.map((key, i) =>
                Column({
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    new Diagram({
                      vortex: Vortex({ key }),
                      onPositionChange: () => {
                        this.didChangePosition();
                      },
                      node: childNodes[i],
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

export default functionalizeClass(Diagram);
