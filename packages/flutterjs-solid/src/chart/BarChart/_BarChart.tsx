import {
  AppRunner,
  Container,
  Text,
  Alignment,
} from "@moonmoonbrothers/flutterjs"
import Widget from "../../lib/Widget"
import BarChart from "./BarChart"

const _BarChart = () => {
  return (
    <Widget
      height="400px"
      widget={BarChart({
        custom: {
          title: {
            type: "config",
            alignment: "center",
            font: {
              style: {
                fontSize: "40px",
              },
            },
          },
        },
        data: {
          title: "Title",
          labels: [],
          datasets: [],
        },
      })}
    />
  )
}

export default _BarChart
