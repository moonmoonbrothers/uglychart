<script lang="ts">
	import Widget from '@moonmoonbrothers/flutterjs-svelte';
	import {
		EdgeInsets,
		Text,
		Container,
		Row,
		Positioned,
		TextStyle,
		BoxDecoration,
		BorderRadius,
		Radius,
		Column,
		MainAxisSize,
		CrossAxisAlignment,
		IntrinsicWidth,
		Alignment,
		Center,
		Expanded,
		FractionallySizedBox,
		Flexible
	} from '@moonmoonbrothers/flutterjs';
	import { BarChart, StackedBarChart } from '@moonmoonbrothers/uglychart';
</script>

<!-- <Widget
	height="500px"
	widget={Container({
		color: 'grey',
		child: Row({
			children: [
				Expanded({
					flex: 0.1,
					child: Row({
						children: []
					})
				}),
				Expanded({
					child: Row({
						children: [
							Container({
								width: 50,
								height: 50,
								color: 'red'
							})
						]
					})
				})
			]
		})
	})}
/> -->

<Widget
	height="500px"
	widget={Container({
		color: 'white',
		child: BarChart({
			data: {
				title: 'Title',
				labels: ['label1_\ntemp', 'label2', 'label3', 'label4', 'label5'],
				datasets: [
					{
						legend: 'A',
						data: [30, 40.5, -50.12, 30.5, 40]
					},
					{
						legend: 'B',
						data: [-60, -20.5, 20.2, 22.5, 10]
					},
					{
						legend: 'C',
						data: [6, 10.5, 20.2, 12.5, 1]
					}
				]
			},
			custom: {
				barGroup: {
					type: 'config',
					colors: ['black', 'grey', 'brown', 'black']
				},
				chart: {
					type: 'config',
					foregroundAdditions: [
						Positioned({
							bottom: -20,
							right: -15,
							child: Text('%ile')
						}),
						Positioned({
							bottom: -25,
							left: 20,
							child: Container({
								color: 'black',
								padding: EdgeInsets.symmetric({ horizontal: 2, vertical: 4 }),
								child: Text('made by moon', {
									style: new TextStyle({ fontSize: 12, color: 'white' })
								})
							})
						})
					]
				},
				title: {
					type: 'config',
					alignment: 'center',
					font: {
						fontSize: 40
					}
				}
			}
		})
	})}
/>
