<script lang="ts">
  import BarCharWidget from "./BarChartWidget"
  import Widget from "@moonmoonbrothers/like-flutter-svelte"
</script>

<Widget height="calc(100vh - 60px)" widget={new BarCharWidget()} />
