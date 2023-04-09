<script lang="ts">
	import Widget from '@moonmoonbrothers/flutterjs-svelte';
	import { EdgeInsets, Text, Container, Row, TextStyle, BoxDecoration, BorderRadius, Radius } from '@moonmoonbrothers/flutterjs';
	import { BarChart, StackedBarChart } from '@moonmoonbrothers/uglychart';
</script>

<div class="container">
	<div class="chart">
		<Widget
			width="1000px"
			height="450px"
			widget={BarChart({
				data: {
					title: '단어 검사 자음 정확도',
					labels: [
						'음절',
						'모음',
						'자음',
						'초성',
						'종성',
						'*ㅂㄷㄱ',
						'ㅁㄴㅇ',
						'ㅈㅉㅊ',
						'ㅅㅆ',
						'ㄹ',
						'양순음 (자질)',
						'치경음 (자질)',
						'연구개음 (자질)',
						'비음 (자질)',
						'기식음 (자질)'
					],
					datasets: [
						{
							legend: '%',
							data: [40, 85, 50, 40, 85, 40, 85, 50, 50, 50, 40, 85, 50, 50, 40]
						}
					]
				},
				custom: {
					layout: {
						type: 'config',
						padding: EdgeInsets.symmetric({ horizontal: 30, vertical: 30 })
					},
					chart: {
						type: 'config',
						direction: 'vertical',
						scale: {
							max: 100,
							min: 0,
							step: 20
						}
					},
					bar: {
						type: 'custom',
						Custom: () =>
							Container({
								width: 12,
								decoration: new BoxDecoration({
									color: '#00308F',
									borderRadius: BorderRadius.vertical({
										top: Radius.circular(6)
									})
								})
							})
					},
					yAxis: {
						type: 'config'
					},
					plot: {
						type: 'config'
					},

					additions: [
						{
							position: {
								top: -20,
								right: 0
							},
							Custom() {
								return Text('a');
							}
						}
					],
					title: {
						type: 'config',
						alignment: 'start',
						font: {
							fontSize: 24,
							color: '#00308F',
							fontFamily: 'Noto Sans KR, sans-serif'
						},
						margin: EdgeInsets.only({ bottom: 20 })
					}
				},
				theme: {
					text: {
						fontFamily: 'Noto Sans KR, sans-serif'
					}
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
		width: 1200px;
	}
</style>
