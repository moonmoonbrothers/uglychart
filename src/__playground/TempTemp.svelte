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
        border: BorderStyle.all({
          color: 'black',
          thickness: 10,
        }),
        child: 
            Container({
              width: 100,
              height: 100,
              color: 'blue',
              border: BorderStyle.all({
                color: 'white',
                thickness: 10,
              })
            }),
      })
  }
/>
