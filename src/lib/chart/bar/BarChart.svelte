<script lang="ts">
  import { browser } from "$app/environment"
  import Text from "$lib/flutter/component/Text"
  import AppRunner from "$lib/flutter/runApp"
  import { onMount } from "svelte"

  let canvalEl!: HTMLCanvasElement

  onMount(() => {
    const runner = new AppRunner({canvas: canvalEl})
    runner.runApp(
      new Text({text: '문대승', style: {
      }})
    )
    const ctx = canvalEl.getContext('2d')!
  })
</script>

<div>
  <canvas bind:this={canvalEl} />
</div>

<style>
  canvas {
    width: 100%;
    height: 200px;
  }
</style>