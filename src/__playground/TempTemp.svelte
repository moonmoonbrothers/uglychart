<script lang="ts">
  import { Column, Container, Text } from "$lib/flutter/component"
  import { Alignment, BorderStyle, Radius } from "$lib/flutter/type"
  import Widget from "$lib/Widget.svelte"

</script>

<Widget
  height="calc(100vh - 60px)"
  widget={
    Container({
        width: Infinity,
        height: Infinity,
        color: 'red',
        alignment: Alignment.topLeft,
        child: Container({
              color: 'yellow',
              child: Text('asedT문text sha zz', { style: { fontSize: '30px' }})
            }),
      })
  }
/>
