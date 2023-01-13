import { Align, Alignment, Container, Grid } from "@moonmoonbrothers/flutterjs"

const Chart = () => {
  return Container({
      color: "green",
      alignment: Alignment.topCenter,
      width: 400,
      height: 300,
      child: Grid({
        templateColumns: [Grid.ContentFit(), Grid.Px(400)],
        templateRows: [Grid.Px(300), Grid.ContentFit()],
        childrenByRow: [
          // [YAxisWrapper(), Plot()],
          // [null, XAxisWrapper()],
        ],
      }),
    })
}

export default Chart
