import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import { Container, Rect, Stack, Positioned, ClipRRect } from '@moonmoonbrothers/flutterjs';
import { dedent } from 'ts-dedent';

const meta = {
	title: 'Widget/ClipRRect',
	component: Widget as any,
	parameters: {
		layout: 'fullscreen'
	}
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

const BasicCode = dedent`
`;
export const Basic: Story = {
	args: {
		ssrSize: { width: 400, height: 400 },
		width: '400px',
		height: '400px',
		widget: ClipRRect({
			clipper: (size) =>
				Rect.fromLTWH({
					left: 0,
					top: 0,
					width: (size.width * 3) / 4,
					height: (size.height * 3) / 4
				}),
			child: Stack({
				children: [
					Positioned({
						left: 0,
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
		}),
		code:
			dedent`import { Container, Rect, Stack, Positioned, ClipRRect } from '@moonmoonbrothers/flutterjs';\n\n\n` +
			BasicCode
	}
};
