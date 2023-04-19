import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import { dedent } from 'ts-dedent';
import {
	TextStyle,
	Text,
	Container,
	EdgeInsets,
	BoxDecoration,
	BorderRadius,
	Radius,
	Positioned,
	Row,
	MainAxisSize,
	SizedBox
} from '@moonmoonbrothers/flutterjs';
import { BarChart } from '@moonmoonbrothers/uglychart';

const meta = {
	title: 'Widget/BarChart/Cases',
	component: Widget
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		ssrSize: { width: 800, height: 480 },
		width: '800px',
		height: '480px',
		widget:
		 BarChart({
			data: {
				title: 'Title',
				labels: ['label1_\ntemp', 'label2', 'label3', 'label4', 'label5'],
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
			},
			custom: {
				barGroup: {
					type: 'config',
					barBackgroundColors: ['black', 'grey', 'brown', 'black']
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
		}),
		code: dedent`
		import { TextStyle, Text, Container, EdgeInsets } from '@moonmoonbrothers/flutterjs';
		import { BarChart } from '@moonmoonbrothers/uglychart';

		BarChart({
			data: {
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
			},
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
	`
	}
};

export const HorizontalWithMinusValue: Story = {
	args: {
		ssrSize: { width: 800, height: 480 },
		width: '800px',
		height: '480px',
		widget: BarChart({
			data: {
				title: 'Title',
				labels: ['label1', 'label2', 'label3', 'label4', 'label5'],
				datasets: [
					{
						legend: 'A',
						data: [-30, 40.5, -50.12, 30.5, 40]
					},
					{
						legend: 'B',
						data: [60, -20.5, 20.2, 22.5, 10]
					},
					{
						legend: 'C',
						data: [6, 10.5, 20.2, -12.5, -1]
					}
				]
			},
			custom: {
				barGroup: {
					type: 'config',
					barBackgroundColors: ['black', 'grey', 'brown', 'black']
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
				bar: {
					type: 'config',
					thickness: 15
				},
				layout: {
					type: 'config',
					padding: EdgeInsets.symmetric({ horizontal: 30, vertical: 30 })
				},
				title: {
					type: 'config',
					alignment: 'center',
					font: {
						fontSize: 40
					}
				}
			}
		}),
		code: dedent`
		import { TextStyle, Text, Container, EdgeInsets } from '@moonmoonbrothers/flutterjs';
		import { BarChart } from '@moonmoonbrothers/uglychart';
	`
	}
};

export const VerticalWithMinusValues: Story = {
	args: {
		ssrSize: { width: 800, height: 480 },
		width: '800px',
		height: '480px',
		widget: BarChart({
			data: {
				title: 'Title',
				labels: ['label1', 'label2', 'label3', 'label4', 'label5'],
				datasets: [
					{
						legend: 'A',
						data: [-30, 40.5, -50.12, 30.5, 40]
					},
					{
						legend: 'B',
						data: [60, -20.5, 20.2, 22.5, 10]
					},
					{
						legend: 'C',
						data: [6, 10.5, 20.2, -12.5, -1]
					}
				]
			},
			custom: {
				barGroup: {
					type: 'config',
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
					padding: EdgeInsets.symmetric({ horizontal: 30, vertical: 30 })
				},
				title: {
					type: 'config',
					alignment: 'center',
					font: {
						fontSize: 40
					}
				}
			}
		}),
		code: dedent`
		import { TextStyle, Text, Container, EdgeInsets } from '@moonmoonbrothers/flutterjs';
		import { BarChart } from '@moonmoonbrothers/uglychart';
	`
	}
};

export const Vertical: Story = {
	args: {
		ssrSize: { width: 800, height: 450 },
		width: '800px',
		height: '450px',
		widget: BarChart({
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
					'양순음\n(자질)',
					'치경음\n(자질)',
					'연구개음\n(자질)',
					'비음\n(자질)',
					'기식음\n(자질)'
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
					backgroundColor: 'white',
					padding: EdgeInsets.symmetric({ horizontal: 30, vertical: 30 })
				},
				chart: {
					type: 'config',
					direction: 'vertical',
					scale: {
						max: 100,
						min: 0,
						step: 20
					},
					foregroundAdditions: [
						Positioned({
							right: 0,
							top: -20,
							child: Row({
								mainAxisSize: MainAxisSize.min,
								children: [
									Container({
										decoration: new BoxDecoration({
											borderRadius: BorderRadius.all(Radius.circular(8)),
											color: 'blue'
										}),
										width: 16,
										height: 16
									}),
									SizedBox({ width: 3 }),
									Text('%', {
										style: new TextStyle({
											fontFamily: 'Noto Sans KR, sans-serif',
											height: 1
										})
									}),
									SizedBox({ width: 10 }),
									Container({
										decoration: new BoxDecoration({
											borderRadius: BorderRadius.all(Radius.circular(8)),
											color: 'orange'
										}),
										width: 16,
										height: 16
									}),
									SizedBox({ width: 3 }),
									Text('%ile', {
										style: new TextStyle({
											fontFamily: 'Noto Sans KR, sans-serif',
											height: 1
										})
									})
								]
							})
						})
					]
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
				xAxis: {
					type: 'config'
				},
				xAxisLabel: {
					type: 'config',
					margin: EdgeInsets.only({ top: 5 })
				},
				yAxisLabel: {
					type: 'config',
					margin: EdgeInsets.only({ right: 5 })
				},
				yAxis: {
					type: 'config',
					thickness: 2
				},
				title: {
					type: 'config',
					alignment: 'start',
					font: {
						fontSize: 24,
						color: '#00308F',
						fontFamily: 'Noto Sans KR, sans-serif'
					},
					margin: EdgeInsets.only({ bottom: 20 })
				},
				yAxisTick: {
					type: 'config',
					thickness: 0
				}
			},
			theme: {
				text: {
					fontFamily: 'Noto Sans KR, sans-serif'
				},
				border: {
					color: '#E8E8E8'
				}
			}
		}),
		code: dedent`
	import { BarChart } from '@moonmoonbrothers/uglychart';
	`
	}
};

export const WithPlotSize: Story = {
	args: {
		ssrSize: { width: 800, height: 480 },
		width: '800px',
		height: '480px',
		widget: BarChart({
			data: {
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
			},
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
				plot: {
					type: 'config',
					height: 300,
					width: 400
				},
				title: {
					type: 'config',
					alignment: 'center',
					font: {
						fontSize: 40
					}
				}
			}
		}),
		code: dedent`
		import { TextStyle, Text, Container, EdgeInsets } from '@moonmoonbrothers/flutterjs';
		import { BarChart } from '@moonmoonbrothers/uglychart';
	`
	}
};
