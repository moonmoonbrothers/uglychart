<script lang="ts">
	import Widget from '@moonmoonbrothers/flutterjs-svelte';
	import {
		EdgeInsets,
		Text,
		Container,
		Row,
		TextStyle,
		BoxDecoration,
		BorderRadius,
		Radius,
		Column,
		MainAxisSize,
		CrossAxisAlignment,
		IntrinsicWidth,
		Alignment
	} from '@moonmoonbrothers/flutterjs';
	import { BarChart, StackedBarChart } from '@moonmoonbrothers/uglychart';
	import { children } from 'svelte/internal';
</script>

<Widget
	width="1000px"
	height="450px"
	widget={IntrinsicWidth({
		child: Container({
			color: 'green',
			alignment: Alignment.topLeft,
			padding: EdgeInsets.only({ right: 10 }),
			child: Column({
				crossAxisAlignment: CrossAxisAlignment.end,
				children: [
					Row({
						mainAxisSize: MainAxisSize.min,
						children: [
							Text('100'),
							Container({
								height: 10,
								width: 100,
								color: 'black'
							})
						]
					}),
					Row({
						mainAxisSize: MainAxisSize.min,
						children: [
							Text('10'),
							Container({
								height: 10,
								width: 100,
								color: 'black'
							})
						]
					}),
					Row({
						mainAxisSize: MainAxisSize.min,
						children: [
							Text('0'),
							Container({
								height: 10,
								width: 100,
								color: 'black'
							})
						]
					})
				]
			})
		})
	})}
/>

<style>
	.container {
		display: flex;
		justify-content: center;
	}
</style>
