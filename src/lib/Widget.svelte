<script lang="ts">
  import AppRunner from "./flutter/runApp"
  import { onMount } from "svelte"
  import { Container, Text } from "./flutter/component"
  import type Widget from "./flutter/widget/Widget"
  import { parseHTML } from "linkedom"
  import { Alignment } from "./flutter/type"
  export let widget: Widget = Container(
    {
      width: Infinity,
      height: Infinity,
      alignment: Alignment.center,
      child: Text('please implement widget here!')
    }
  )
  export let ssrSize: { width: number, height: number } | undefined = undefined
  export let width = '100%'
  export let height = '300px'

  let svgEl!: SVGSVGElement
  let containerEl: HTMLElement
  const { document: _document, window: _window } = parseHTML(`<svg></svg>`)
  const _svg = _document.querySelector('svg')!
  const runner = new AppRunner({
    view: _svg,
    window: _window,
    document: _document,
    ssrSize,
  })
  const innerHTML = runner.runApp(widget)
  onMount(() => {
    runner.onMount({
      view: svgEl,
      resizeTarget: containerEl,
    })
  })
</script>

<div bind:this={containerEl} style="--width: {width}; --height: {height}">
  <svg  bind:this={svgEl}>
    {@html innerHTML}
  </svg>
</div>

<style>
  div {
    width: var(--width);
    height: var(--height);
  }
  svg {
    width: 100%;
    height: 100%;
  }
</style>
