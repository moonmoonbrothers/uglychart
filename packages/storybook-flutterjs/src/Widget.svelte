<script lang="ts">
	import Widget from '@moonmoonbrothers/flutterjs-svelte';
	export let widget: any;
	export let ssrSize: { width: number; height: number };
	export let width: string;
	export let height: string;
	export let description = '';
</script>

<Widget {widget} {width} {height} {ssrSize} />
<p>
	{description}
</p>

<style>
	p {
		margin-top: 8px;
	}
</style>
