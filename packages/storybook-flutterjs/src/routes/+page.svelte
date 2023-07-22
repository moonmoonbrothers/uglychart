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

<Widget
	width="400px"
	height="400px"
	widget={Container({
		alignment: Alignment.center,
		color: 'lightgreen',
		child: GestureDetector({
			onClick() {
				alert('hi');
				console.log('clicked!!');
			},
			child: Container({
				width: 200,
				height: 200,
				color: 'black',
				alignment: Alignment.center,
				child: Text('click here!!', {
					style: new TextStyle({ fontSize: 20, fontWeight: 'bold', color: 'white' })
				})
			})
		})
	})}
/>

<svg viewBox="0 0 400 400" width="400" height="400">
	<rect x="0" y="0" fill="red" width="100" height="100" />
	<g>
		<rect
			on:mousedown={() => alert('hi')}
			x="0"
			y="0"
			opacity="0.5"
			fill="blue"
			width="100"
			height="100"
		/>
	</g>

	<text alignment-baseline="text-before-edge">
		<tspan alignment-baseline="text-before-edge">hi</tspan>
		<tspan alignment-baseline="text-before-edge">{'hihi'}</tspan>
		<tspan alignment-baseline="text-before-edge">hi</tspan>
	</text>
</svg>

<div on:click={() => alert('box1')} class="box1">
	<button on:click={() => alert('box2')} class="box2" />
</div>

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
		pointer-events: visibleStroke;
	}
</style>
