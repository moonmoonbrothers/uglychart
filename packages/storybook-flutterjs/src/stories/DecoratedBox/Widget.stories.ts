import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import {
	Container,
	ClipRRect,
	BorderRadius,
	Radius,
	Center,
	DecoratedBox,
	BoxDecoration,
	SizedBox
} from '@moonmoonbrothers/flutterjs';
import { dedent } from 'ts-dedent';

const meta = {
	title: 'Widget/DecoratedBox',
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
		widget: Center({
			child: DecoratedBox({
				decoration: new BoxDecoration({ color: 'red' }),
				child: SizedBox({
					width: 200,
					height: 200
				})
			})
		}),
		code:
			dedent`import { Container, Center, ClipRRect } from '@moonmoonbrothers/flutterjs';\n\n\n` +
			BasicCode
	}
};
