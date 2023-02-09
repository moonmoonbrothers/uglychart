<script lang="ts">
	import Widget from '@moonmoonbrothers/flutterjs-svelte';
	import { EdgeInsets, Text, Container, Row } from '@moonmoonbrothers/flutterjs';
	import { BarChart } from '@moonmoonbrothers/uglychart';

	const data = {
		title: 'Title',
		labels: ['label1', 'label2', 'label3', 'label4', 'label5'],
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
				data: [60, 20.5, 29, 22.5, 10].reverse()
			}
		]
	};
</script>

<div class="container">
	<div class="chart">
		<!-- <Widget
			height="400px"
			widget={Container({
				margin: EdgeInsets.only({ top: 50 }),
				color: 'lightblue',
				child: Row({
					children: [
						Container({
							color: ' red',
							child: Text('1234가', { style: { fontSize: '50px' }, textBaseline: 'central' })
						}),
						Container({ height: 2, color: 'red', width: 10 })
					]
				})
			})}
		/> -->
		<Widget
			width=""
			height="500px"
			widget={BarChart({
				custom: {
					barGroup: {
						kind: 'series',
						type: 'config',
						barBackgroundColors: ['black', 'grey', 'brown', 'black']
					},
					chart: {
						type: 'config',
						scale: {
							min: 0,
							max: 100,
							step: 10
						}
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
										style: { fontSize: '12px', fontColor: 'white' }
									})
								})
						}
					],
					title: {
						type: 'config',
						alignment: 'center',
						font: {
							style: {
								fontSize: '40px'
							}
						}
					}
				},
				data
			})}
		/>

		<Widget
			width=""
			height="400px"
			widget={BarChart({
				scale: {
					max: 100
				},
				custom: {
					barGroup: {
						kind: 'series',
						type: 'config',
						barBackgroundColors: ['black', 'grey', 'brown', 'black']
					},
					chart: {
						type: 'config',
						direction: 'vertical',
						scale: {
							min: 0,
							max: 100,
							step: 10
						}
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
										style: { fontSize: '12px', fontColor: 'white' }
									})
								})
						}
					],
					title: {
						type: 'config',
						alignment: 'center',
						font: {
							style: {
								fontSize: '40px'
							}
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
