<script lang="ts">
  import AppRunner from "$lib/flutter/runApp"
  import TempWidget from "../../../__playground/TempWidget"
  import { onMount } from "svelte"
  import BarCharWidget from "./BarChartWidget"

  let canvalEl!: HTMLCanvasElement

  onMount(() => {
    const runner = new AppRunner({ 
      canvas: canvalEl
    })
    runner.runApp(new TempWidget())
  })
</script>

<canvas bind:this={canvalEl}/>

<style>
  canvas {
    width: 100%;
    height: calc(100vh - 60px);
  }
</style>