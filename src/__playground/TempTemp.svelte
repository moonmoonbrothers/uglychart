<script lang="ts">
  import { Container, Text } from "$lib/flutter/component"
  import { Alignment } from "$lib/flutter/type"
  import Widget from "$lib/Widget.svelte"

</script>

<Widget
  height="calc(100vh - 60px)"
  widget={
    Container({
        width: Infinity,
        height: Infinity,
        alignment: Alignment.center,
        child: Text('ABCHDE') 
      })
  }
/>
