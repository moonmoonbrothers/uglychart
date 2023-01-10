import { Component, onMount } from "solid-js"
import {
  Widget as _Widget,
  AppRunner,
  Container,
  Text,
} from "@moonmoonbrothers/flutterjs"

const Widget: Component = ({
  width = "100%",
  height = "calc(100vh - 30px)",
  widget = Container({
    width: Infinity,
    height: Infinity,
    child: Text("asdf"),
    color: "red",
  }),
}: {
  width?: string
  height?: string
  widget?: _Widget
}) => {
  let containerEl: HTMLDivElement | undefined
  let svgEl: SVGSVGElement | undefined
  onMount(() => {
    if (!containerEl) return
    if (!svgEl) return
    const runner = new AppRunner({
      view: svgEl,
    })
    runner.onMount({ resizeTarget: containerEl })
    runner.runApp(widget)
  })

  return (
    <div ref={containerEl} style={{ width, height }}>
      <svg ref={svgEl} />
    </div>
  )
}

export default Widget
