<script lang="ts">
	import Widget from '@moonmoonbrothers/flutterjs-svelte';
	import { EdgeInsets, Text, Container, Row, TextStyle } from '@moonmoonbrothers/flutterjs';
	import { BarChart, StackedBarChart } from '@moonmoonbrothers/uglychart';

	const data = {
		title: 'Title',
		labels: ['label1_123_', 'label2', 'label3', 'label4', 'label5'],
		datasets: [
			{
				legend: 'A',
				data: [30, 40.5, 50.12, 30.5, 40]
			},
			{
				legend: 'B',
				data: [60, 20.5, 20.2, 22.5, 10]
			},
			{
				legend: 'C',
				data: [6, 10.5, 20.2, 12.5, 1]
			}
		]
	};
</script>

<div class="container">
	<div class="chart">
		<!-- <Widget
			height="500px"
			widget={Container({
				width: 100,
				height: 100,
				color: 'red'
			})}
		/> -->
		<Widget
			ssrSize={{
				width: 500,
				height: 500
			}}
			height="500px"
			widget={BarChart({
				data,
				custom: {
					barGroup: {
						type: 'config',
						barBackgroundColors: ['black', 'grey', 'brown', 'black']
					},
					bar: {
						type: 'config',
						thickness: 15
					},
					layout: {
						type: 'config',
						padding: EdgeInsets.symmetric({ horizontal: 30, vertical: 30 })
					},
					additions: [
						{
							position: { bottom: -20, right: -15 },
							Custom: () => Text('%ile')
						},
						{
							position: { bottom: -25, left: 20 },
							Custom: () =>
								Container({
									color: 'black',
									padding: EdgeInsets.symmetric({ horizontal: 2, vertical: 4 }),
									child: Text('made by moon', {
										style: new TextStyle({ fontSize: 12, color: 'white' })
									})
								})
						}
					],
					title: {
						type: 'config',
						alignment: 'center',
						font: {
							fontSize: 40
						}
					}
				}
			})
			}
		/>

		<Widget
			height="400px"
			widget={BarChart({
				custom: {
					barGroup: {
						type: 'config',
						gap: 4,
						barBackgroundColors: ['black', 'grey', 'brown', 'black']
					},
					chart: {
						type: 'config',
						direction: 'vertical'
					},
					bar: {
						type: 'config',
						thickness: 15
					},
					layout: {
						type: 'config',
						padding: EdgeInsets.symmetric({ horizontal: 40, vertical: 30 })
					},
					additions: [
						{
							position: { top: -10, left: -35 },
							Custom: () => Text('%ile')
						},
						{
							position: { bottom: -25, left: 20 },
							Custom: () =>
								Container({
									color: 'black',
									padding: EdgeInsets.symmetric({ horizontal: 2, vertical: 4 }),
									child: Text('made by moon', {
										style: new TextStyle({ fontSize: 12, color: 'white' })
									})
								})
						}
					],
					title: {
						type: 'config',
						alignment: 'center',
						font: {
							fontSize: 40
						}
					}
				},
				data
			})}
		/>
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
	}
	.chart {
		width: 700px;
	}
</style>
