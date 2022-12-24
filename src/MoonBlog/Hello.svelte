<script lang="ts">
  import { Column, Container, Padding, Text } from "$lib/flutter/component"
  import { Alignment, BorderStyle, EdgeInsets, Radius } from "$lib/flutter/type"
  import Widget from "$lib/Widget.svelte"
</script>

<Widget
  height="calc(100vh - 60px)"
  widget={Container({
    width: Infinity,
    height: Infinity,
    color: "#16a085",
    alignment: Alignment.center,
    child: Text("", { style: { fontSize: "30px" } }),
  })}
/>
