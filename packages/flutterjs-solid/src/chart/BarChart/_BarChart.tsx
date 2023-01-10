import {
  AppRunner,
  Container,
  Text,
  Alignment,
} from "@moonmoonbrothers/flutterjs"
import Widget from "../../lib/Widget"
import BarChart from "./BarChart"

const _BarChart = () => {
  return <Widget widget={BarChart()} />
}

export default _BarChart
