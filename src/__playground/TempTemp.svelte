<script lang="ts">
  import AppRunner from "$lib/flutter/runApp"
  import { onMount } from "svelte"
  import TempWidget from "./TempWidget"

  let canvalEl!: HTMLCanvasElement

  onMount(() => {
    const runner = new AppRunner({canvas: canvalEl})
    runner.runApp(new TempWidget())
  })
</script>

<canvas bind:this={canvalEl}/>

<style>
  div {
    width: 150px;
    height: 150px;
    border-bottom: black solid 5px;
    border-right: red solid 5px;
    border-left: yellow solid 5px;
    background-color: blue;
  }
  canvas {
    width: 100%;
    height: calc(100vh - 60px);
  }
</style>