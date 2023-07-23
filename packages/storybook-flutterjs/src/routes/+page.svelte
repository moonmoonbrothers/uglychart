<script lang="ts">
	import {
		Alignment,
		Container,
		GestureDetector,
		Text,
		TextStyle
	} from '@moonmoonbrothers/flutterjs';
	import Widget from '@moonmoonbrothers/flutterjs-svelte';
</script>

<svg viewBox="0 0 400 400" width="400" height="400" on:click={() => console.log('this is svg')}>
	<g>
		<circle
			cursor="pointer"
			on:mousedown={() => console.log('clicked')}
			x="0"
			y="0"
			opacity="0.5"
			fill="blue"
			r="100"
		/>
	</g>
</svg>

<style>
	.box1 {
		width: 200px;
		height: 200px;
		background: blue;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.box2 {
		width: 100px;
		height: 100px;
		background: red;
	}
	:global(svg *) {
	}
</style>
