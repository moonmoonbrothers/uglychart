<script lang="ts">
  import Container from "$lib/flutter/component/Container"
  import Text from "$lib/flutter/component/Text"
  import AppRunner from "$lib/flutter/runApp"
  import { onMount } from "svelte"

  let canvalEl!: HTMLCanvasElement

  onMount(() => {
    const runner = new AppRunner({canvas: canvalEl})
    runner.runApp(
      new Container(
        {
          child: new Text({
              text: 'Pasta', 
              style: {
                fontSize: '50px',
              }
            }),
           width: Infinity, 
           height: Infinity,
           style: { 
              background: { 
                color: 'lightblue' 
              } 
           } 
        }
      )
    )
    //const ctx = canvalEl.getContext('2d')!
  })
</script>

<div>
  <canvas  bind:this={canvalEl} />
</div>

<style>
  canvas {
    width: 100%;
    height: 200px
  }
</style>