import {
  AppRunner,
  Container,
  Text,
  Alignment,
} from "@moonmoonbrothers/flutterjs"

const BarChart = () => {
  return Container({
    color: "green",
    width: Infinity,
    height: Infinity,
    alignment: Alignment.center,
    child: Text("Happy!!"),
  })
}

export default BarChart
