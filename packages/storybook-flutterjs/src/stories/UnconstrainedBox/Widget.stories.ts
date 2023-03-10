import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import { dedent } from 'ts-dedent';
import {
	Container,
	Rect,
	ClipOval,
	Column,
	Row,
	Flexible,
	Stack,
	Positioned,
	SizedBox
} from '@moonmoonbrothers/flutterjs';

const importWidgets = dedent`import {
	Container,
	Rect,
	ClipOval,
	Column,
	Row,
	Flexible,
	Stack,
	Positioned,
	SizedBox,
} from '@moonmoonbrothers/flutterjs'
`;
const meta = {
	title: 'Widget/UnconstrainedBox',
	component: Widget
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

const BasicWidget = dedent`
	ClipOval({
		clipper: (size) =>
			Rect.fromLTWH({
				left: 0,
				top: 0,
				width: (size.width * 3) / 4,
				height: (size.height * 3) / 4
			}),
		child: Stack({
			children: [
				SizedBox({
					width: 400,
					height: 400
				}),
				Positioned({
					child: Container({ width: 200, height: 200, color: 'blue' })
				}),
				Positioned({
					left: 200,
					child: Container({ width: 200, height: 200, color: 'red' })
				}),
				Positioned({
					top: 200,
					child: Container({ width: 200, height: 200, color: 'green' })
				}),
				Positioned({
					left: 200,
					top: 200,
					child: Container({ width: 200, height: 200, color: 'purple' })
				})
			]
		})
	})
	`;
export const Basic: Story = {
	args: {
		ssrSize: { width: 400, height: 400 },
		width: '400px',
		height: '400px',
		code: importWidgets + '\n\n' + BasicWidget,
		widget: ClipOval({
			clipper: (size) =>
				Rect.fromLTWH({
					left: 0,
					top: 0,
					width: (size.width * 3) / 4,
					height: (size.height * 3) / 4
				}),
			child: Stack({
				children: [
					SizedBox({
						width: 400,
						height: 400
					}),
					Positioned({
						child: Container({ width: 200, height: 200, color: 'blue' })
					}),
					Positioned({
						left: 200,
						child: Container({ width: 200, height: 200, color: 'red' })
					}),
					Positioned({
						top: 200,
						child: Container({ width: 200, height: 200, color: 'green' })
					}),
					Positioned({
						left: 200,
						top: 200,
						child: Container({ width: 200, height: 200, color: 'purple' })
					})
				]
			})
		})
	}
};

const TranslatedClipWidget = dedent`
	Column({
		children: [
			Flexible({
				child: Row({
					children: [
						Flexible({
							child: ClipOval({
								clipper: (size) =>
									Rect.fromCenter({
										center: { x: size.width / 2, y: size.height / 2 },
										width: size.width / 2,
										height: size.height / 2
									}),
								child: Container({
									color: 'blue'
								})
							})
						}),
						Flexible({
							child: Container({
								color: 'red'
							})
						})
					]
				})
			}),
			Flexible({
				child: Row({
					children: [
						Flexible({
							child: Container({
								color: 'green'
							})
						}),
						Flexible({
							child: ClipOval({
								clipper: (size) =>
									Rect.fromCenter({
										center: { x: size.width / 2, y: size.height / 2 },
										width: size.width / 2,
										height: size.height / 2
									}),
								child: Container({
									color: 'purple'
								})
							})
						})
					]
				})
			})
		]
	})
`;
export const TranslatedClip: Story = {
	args: {
		ssrSize: { width: 400, height: 400 },
		width: '400px',
		height: '400px',
		widget: Column({
			children: [
				Flexible({
					child: Row({
						children: [
							Flexible({
								child: ClipOval({
									clipper: (size) =>
										Rect.fromCenter({
											center: { x: size.width / 2, y: size.height / 2 },
											width: size.width / 2,
											height: size.height / 2
										}),
									child: Container({
										color: 'blue'
									})
								})
							}),
							Flexible({
								child: Container({
									color: 'red'
								})
							})
						]
					})
				}),
				Flexible({
					child: Row({
						children: [
							Flexible({
								child: Container({
									color: 'green'
								})
							}),
							Flexible({
								child: ClipOval({
									clipper: (size) =>
										Rect.fromCenter({
											center: { x: size.width / 2, y: size.height / 2 },
											width: size.width / 2,
											height: size.height / 2
										}),
									child: Container({
										color: 'purple'
									})
								})
							})
						]
					})
				})
			]
		}),
		code: importWidgets + '\n\n' + TranslatedClipWidget
	}
};
