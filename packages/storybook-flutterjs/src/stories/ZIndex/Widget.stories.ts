import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import { dedent } from 'ts-dedent';
import { Container, Center, ZIndex, Stack, Positioned } from '@moonmoonbrothers/flutterjs';

const meta = {
	title: 'Widget/ZIndex',
	component: Widget
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

const BasicWidget = dedent`
	Center({
		child: Container({
			width: 200,
			height: 200,
			child: Stack({
				children: [
					ZIndex({
						zIndex: 9999,
						child: Positioned({
							top: 0,
							left: 0,
							child: Container({
								width: 100,
								height: 100,
								color: 'red'
							})
						}),
						zIndex: 1
					}),
					Positioned({
						top: 0,
						left: 50,
						child: Container({
							width: 100,
							height: 100,
							color: 'blue'
						})
					})
				]
			})
		})
	})
`;

export const Basic: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		code:
			dedent`import { Container, Center, ZIndex, Stack, Positioned } from '@moonmoonbrothers/flutterjs'\n\n\n` +
			BasicWidget,
		widget: Center({
			child: Container({
				width: 200,
				height: 200,
				child: Stack({
					children: [
						ZIndex({
							zIndex: 9999,
							child: Positioned({
								top: 0,
								left: 0,
								child: Container({
									width: 100,
									height: 100,
									color: 'red'
								})
							})
						}),
						Positioned({
							top: 0,
							left: 50,
							child: Container({
								width: 100,
								height: 100,
								color: 'blue'
							})
						})
					]
				})
			})
		})
	}
};
