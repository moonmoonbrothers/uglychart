<script lang="ts">
  import AppRunner from "$lib/flutter/runApp"
  import ComponentWidget from "$lib/flutter/widget/ComponentWidget"
  import { parseHTML } from "linkedom"

  let canvalEl!: HTMLCanvasElement
  let svg: HTMLElement
  const text = ``
  const {document: _docu} = parseHTML(`<div class="container"></div>`)
  const container = _docu.querySelector('.container')!
  let newElement = _docu.createElementNS('http://www.w3.org/2000/svg','rect');
  newElement.setAttribute('fill','orange');
  newElement.setAttribute('width','200');
  newElement.setAttribute('height','200');


</script>

<svg width="200" height="200">
  {@html container.innerHTML}
</svg>

<style>
</style>