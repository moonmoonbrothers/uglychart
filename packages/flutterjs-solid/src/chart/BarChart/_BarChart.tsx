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
      widget={BarChart({
        title: "Title",
        custom: {
          title: {
            type: "config",
            alignment: 'center',
            font: {
              style: {
                fontSize: '40px'
              }
            }
          }
        },
        data: {
          labels: [],
          datasets: [],
        },
      })}
    />
  )
}

export default _BarChart
