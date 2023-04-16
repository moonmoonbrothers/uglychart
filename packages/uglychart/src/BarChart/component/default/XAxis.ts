import {Widget} from '@moonmoonbrothers/flutterjs'
export default function XAxis({}: XAxisProps) {

}

type XAxisProps = {
  type: "index" | "value"
  labels: string[] | number[]
  children: Widget[]
  axisColor: string
  axisThickness: number
}