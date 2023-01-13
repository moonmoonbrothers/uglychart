import {
  ComponentWidget,
  EdgeInsets,
  Padding,
  Row,
  Text,
  Widget,
} from "@moonmoonbrothers/flutterjs"
import { TextProps } from "@moonmoonbrothers/flutterjs/src/component/base/BaseText"
import { BuildContext } from "@moonmoonbrothers/flutterjs/src/widget/ComponentWidget"
import { ThemeProvider } from "../provider"

export default class Title extends ComponentWidget {
  private align: "start" | "end" | "center"
  private text: string
  private margin: EdgeInsets
  private textProps: TextProps | undefined
  constructor({
    align = "start",
    text = "",
    margin = EdgeInsets.all(0),
    textProps,
  }: {
    align?: "start" | "end" | "center"
    margin?: EdgeInsets
    text?: string
    textProps?: TextProps
  }) {
    super()
    this.align = align
    this.text = text
    this.margin = margin
    this.textProps = textProps
  }

  build(context: BuildContext): Widget {
    return Padding({
      padding: this.margin,
      child: Row({
        mainAxisAlignment: this.align === "center" ? "spaceEvenly" : this.align,
        children: [Text(this.text, this.textProps)],
      }),
    })
  }
}
