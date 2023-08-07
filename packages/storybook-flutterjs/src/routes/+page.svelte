<script lang="ts">
	import {
		Alignment,
		Container,
		GestureDetector,
		Text,
		TextStyle,
		StatefulWidget,
		State
	} from '@moonmoonbrothers/flutterjs';
	import Widget from '@moonmoonbrothers/flutterjs-svelte';
	import CustomWidget from './temp';
</script>

<Widget
	width="400px"
	height="400px"
	ssrSize={{ width: 400, height: 400 }}
	widget={new CustomWidget()}
/>

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
