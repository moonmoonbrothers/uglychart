<script lang="ts">
	import Widget from '@moonmoonbrothers/flutterjs-svelte';
	import { EdgeInsets, Text, Container } from '@moonmoonbrothers/flutterjs';
	import { BarChart } from '@moonmoonbrothers/uglychart';
</script>

<div class="container">
	<div class="chart">
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
						barBackgroundColors: ['blue', 'green', 'yellow']
					},
					chart: {
						type: 'config'
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
				data: {
					title: 'Title',
					labels: ['label1', 'label2', 'label3', 'label4', 'label5'],
					datasets: [
						{
							legend: 'A',
							data: [30, 40.5, 50.12, 30.5, 40]
						},
						{
							legend: 'B',
							data: [60, 20.5, 50.2, 22.5, 10]
						}
					]
				}
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
