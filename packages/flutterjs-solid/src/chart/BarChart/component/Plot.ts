import { Container, Alignment, Text } from "@moonmoonbrothers/flutterjs"

const Plot = () =>
  Container({
    color: "red",
    width: Infinity,
    height: Infinity,
    alignment: Alignment.center,
    child: Text("어찌해야하오..", {
      style: { fontColor: "white", fontSize: "30px" },
    }),
  })

  export default Plot