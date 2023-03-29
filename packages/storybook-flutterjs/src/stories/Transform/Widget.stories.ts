import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import { dedent } from 'ts-dedent';
import { Center, Transform, Matrix4, Container } from '@moonmoonbrothers/flutterjs';

const meta = {
	title: 'Widget/Transform',
	component: Widget
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

const BasicWidget = dedent`
		Center({
			child: Transform({
				transform: Matrix4.translationValues(-50, -50, 0),
				child: Container({
					width: 200,
					height: 200,
					color: 'green'
				})
			})
		})
`;

export const Basic: Story = {
	args: {
		ssrSize: { width: 400, height: 400 },
		width: '400px',
		height: '400px',
		code:
			dedent`import { Center, Transform, Matrix4, Container } from '@moonmoonbrothers/flutterjs';\n\n\n` +
			BasicWidget,
		widget: Center({
			child: Transform({
				transform: Matrix4.translationValues(-50, -50, 0),
				child: Container({
					width: 200,
					height: 200,
					color: 'green'
				})
			})
		})
	}
};

const RotateCode= dedent`
		Center({
			child: Transform.rotate({
				angle: Math.PI / 4,
				child: Container({
					width: 200,
					height: 200,
					color: 'green'
				})
			})
		})
`

export const Rotate: Story = {
	args: {
		ssrSize: { width: 400, height: 400 },
		width: '400px',
		height: '400px',
		code:
			dedent`import { Center, Transform, Container } from '@moonmoonbrothers/flutterjs';\n\n\n` +
			RotateCode,
		widget: Center({
			child: Transform.rotate({
				angle: Math.PI / 4,
				child: Container({
					width: 200,
					height: 200,
					color: 'green'
				})
			})
		})
	}
};

const ScaleCode= dedent`
		Center({
			child: Transform.scale({
				scale: 0.5,
				child: Container({
					width: 200,
					height: 200,
					color: 'green'
				})
			})
		})
`

export const Scale: Story = {
	args: {
		ssrSize: { width: 400, height: 400 },
		width: '400px',
		height: '400px',
		code:
			dedent`import { Center, Transform, Container } from '@moonmoonbrothers/flutterjs';\n\n\n` +
			ScaleCode,
		widget: Center({
			child: Transform.scale({
				scale: 0.5,
				child: Container({
					width: 200,
					height: 200,
					color: 'green'
				})
			})
		})
	}
};
