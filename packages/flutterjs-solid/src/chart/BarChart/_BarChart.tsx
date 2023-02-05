import {
  AppRunner,
  Container,
  Text,
  Alignment,
  EdgeInsets,
} from "@moonmoonbrothers/flutterjs"
import Widget from "../../lib/Widget"
import BarChart from "./BarChart"

const _BarChart = () => {
  return (
    <Widget
      height="400px"
      widget={BarChart({
        type: "horizontal",
        scale: {
          max: 100,
        },
        custom: {
          xAxis: {
            type: "config",
            axis: "data",
          },
          yAxis: {
            type: "config",
            axis: "label",
          },
          bar: {
            type: "config",
            thickness: 15,
          },
          layout: {
            type: "config",
            padding: EdgeInsets.symmetric({ horizontal: 30, vertical: 30 }),
          },
          additions: [
            {
              position: { bottom: -20, right: -15 },
              Custom: () => Text("%ile"),
            },
            {
              position: { bottom: -25, left: 20 },
              Custom: () =>
                Container({
                  color: "black",
                  padding: EdgeInsets.symmetric({ horizontal: 2, vertical: 4 }),
                  child: Text("made by moon", {
                    style: { fontSize: "12px", fontColor: "white" },
                  }),
                }),
            },
          ],
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
          labels: ["label1", "label2", "label3", "label4", "label5"],
          datasets: [
            {
              legend: "A",
              data: [30, 40.5, 50.12, 30.5, 40],
            },
            {
              legend: "B",
              data: [60, 20.5, 50.2, 22.5, 10],
            },
          ],
        },
      })}
    />
  )
}

export default _BarChart
