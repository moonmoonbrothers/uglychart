<script lang="ts">
  import AppRunner from "./flutter/runApp"
  import { onMount } from "svelte"
  import { Container, Text } from "./flutter/component"
  import { Alignment } from "./flutter/type"
  import type Widget from "./flutter/widget/Widget"
  export let widget: Widget = Container({
    color: 'lightgrey',
    width: Infinity,
    height: Infinity,
    alignment: Alignment.center,
    child: Text('replace widget props! on this component')
    
  })
  export let width = '600px'
  export let height = '300px'

  let canvalEl!: HTMLCanvasElement

  onMount(() => {
    const runner = new AppRunner({canvas: canvalEl})
    runner.runApp(widget)
  })
</script>

<canvas style="--canvas-width: {width}; --canvas-height: {height}"  bind:this={canvalEl} />

<style>
  canvas {
    width: var(--canvas-width);
    height: var(--canvas-height);
  }
</style>
