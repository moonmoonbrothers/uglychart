<script lang="ts">
  import AppRunner from "$lib/flutter/runApp"
  import { onMount } from "svelte"
  import TempWidget from "./TempWidget"

  let canvalEl!: HTMLCanvasElement

  onMount(() => {
    const runner = new AppRunner({canvas: canvalEl})
    runner.runApp(new TempWidget())
    //const ctx = canvalEl.getContext('2d')!
  })
</script>

<canvas bind:this={canvalEl}/>

<style>
  canvas {
    width: 100%;
    height: calc(100vh - 60px);
  }
</style>