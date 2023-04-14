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
	Column,
	CrossAxisAlignment,
	Expanded,
	Border,
	BorderSide,
	Row,
	MainAxisSize,
	SizedBox,
	TextBaseline,
	MainAxisAlignment,
	Alignment,
	Flexible,
	CustomPaint,
	Size,
	Path,
	Rect
} from '@moonmoonbrothers/flutterjs';
import { BarChart } from '@moonmoonbrothers/uglychart';

const meta = {
	title: 'Widget/BarChart',
	component: Widget
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
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

export const Vertical: Story = {
	args: {
		ssrSize: { width: 800, height: 450 },
		width: '900px',
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
					type: 'config',
					tick: {
						length: 0
					}
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
					thickness: 0,
					tick: {
						length: 0
					}
				},
				plot: {
					type: 'config',
					backgroundAdditions: [
						Column({
							crossAxisAlignment: CrossAxisAlignment.stretch,
							children: Array.from({ length: 5 }, () =>
								Expanded({
									child: Container({
										decoration: new BoxDecoration({
											border: new Border({
												top: new BorderSide({
													color: '#E8E8E8',
													width: 2
												})
											})
										})
									})
								})
							)
						})
					]
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
	import {
		TextStyle,
		Text,
		Container,
		EdgeInsets,
		BoxDecoration,
		BorderRadius,
		Radius,
		Positioned,
		Column,
		CrossAxisAlignment,
		Expanded,
		Border,
		BorderSide,
		Row,
		MainAxisSize,
		SizedBox
	} from '@moonmoonbrothers/flutterjs';

	BarChart({
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
				},
				additions: [
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
				type: 'config',
				tick: {
					length: 0
				}
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
				thickness: 0,
				tick: {
					length: 0
				}
			},
			plot: {
				type: 'config',
				additions: [
					Column({
						crossAxisAlignment: CrossAxisAlignment.stretch,
						children: Array.from({ length: 5 }, () =>
							Expanded({
								child: Container({
									decoration: new BoxDecoration({
										border: new Border({
											top: new BorderSide({
												color: '#E8E8E8',
												width: 2
											})
										})
									})
								})
							})
						)
					})
				]
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
	`
	}
};

export const Temp: Story = {
	args: {
		ssrSize: {
			width: 100,
			height: 100
		},
		width: '1000px',
		height: '600px',
		widget: BarChart({
			data: {
				title: '단어 검사 자음 정확도',
				labels: [
					'음절',
					'모음',
					'자음',
					'',
					'초성',
					'종성',
					'',
					'*ㅂㄷㄱ',
					'ㅁㄴㅇ',
					'ㅈㅉㅊ',
					'ㅅㅆ',
					'ㄹ',
					'',
					'양순음 (자질)',
					'치경음 (자질)',
					'연구개음 (자질)',
					'비음 (자질)',
					'기식음 (자질)'
				],
				datasets: [
					{
						legend: '%',
						data: [40, 85, 50, 0, 40, 85, 0, 40, 85, 50, 50, 50, 0, 40, 85, 50, 50, 40]
					}
				]
			},
			custom: {
				title: {
					type: 'config',
					alignment: 'start',
					margin: EdgeInsets.only({ bottom: 20 })
				},
				layout: {
					type: 'config',
					padding: EdgeInsets.all(30)
				},
				plot: {
					type: 'config',
					width: 500,
					height: 300,
					backgroundAdditions: [],
					foregroundAdditions: [
						CustomPaint({
							size: Size.infinite,
							painter: {
								createDefaultSvgEl(context) {
									const rect = context.createSvgEl('rect');
									const line = context.createSvgEl('line');
									const path = context.createSvgEl('path');
									return {
										rect,
										path
									};
								},
								paint(els, size) {
									const { rect, path } = els;
									const pathUtil = new Path();
									const d = pathUtil
										.moveTo({ x: 0, y: 0 })
										.lineTo({ x: 10, y: 10 })
										.lineTo({ x: 0, y: 10 })
										.close()
										.close()
										.getD();

									path.setAttribute('d', d);
									path.setAttribute('fill', 'red');
								}
							}
						})
					]
				},
				yAxis: {
					type: 'config',
					thickness: 0,
					tick: {
						length: 0
					}
				},
				xAxis: {
					type: 'config',
					tick: {
						length: 0
					}
				},
				xAxisLabel: {
					type: 'config',
					margin: EdgeInsets.only({ top: 6 }),
					font: {
						lineHeight: 1.4
					}
				},
				yAxisLabel: {
					type: 'config',
					margin: EdgeInsets.only({ right: 10 })
				},
				bar: {
					type: 'custom',
					Custom() {
						return Container({
							width: 12,
							decoration: new BoxDecoration({
								color: 'blue',
								borderRadius: BorderRadius.vertical({ top: Radius.circular(6) })
							})
						});
					}
				},
				chart: {
					type: 'config',
					alignment: Alignment.topCenter,
					direction: 'vertical',
					scale: {
						min: 0,
						max: 100,
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
										width: 12,
										height: 12,
										decoration: new BoxDecoration({
											color: 'blue',
											borderRadius: BorderRadius.all(Radius.circular(6))
										})
									}),
									SizedBox({
										width: 3
									}),
									Text('%ile', { style: new TextStyle({ height: 1 }) }),
									SizedBox({
										width: 10
									}),
									Container({
										width: 12,
										height: 12,
										decoration: new BoxDecoration({
											color: 'orange',
											borderRadius: BorderRadius.all(Radius.circular(6))
										})
									}),
									SizedBox({
										width: 3
									}),
									Text('%', { style: new TextStyle({ height: 1 }) })
								]
							})
						})
					]
				}
			},
			theme: {
				text: {
					color: 'gray'
				},
				border: {
					color: 'gray',
					width: 1
				}
			}
		}),
		code: dedent`
	`
	}
};
