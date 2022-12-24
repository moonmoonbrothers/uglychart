<script lang="ts">
  import BarCharWidget from "./BarChartWidget"
  import Widget from "$lib/Widget.svelte"
  import { claim_component } from "svelte/internal"

</script>

<Widget
  height="calc(100vh - 60px)"
  widget={new BarCharWidget()}
/>