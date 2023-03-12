import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import { dedent } from 'ts-dedent';
import {
	Container,
	FractionallySizedBox,
	Center,
	Row,
	Flexible
} from '@moonmoonbrothers/flutterjs';

const meta = {
	title: 'Widget/FractionallySizedBox',
	component: Widget
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

const BasicWidget = dedent`
	Align({
		child: Container({
			width: 200,
			height: 200,
			color: 'orange'
		})
	})
`;

export const Basic: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		code:
			dedent`import { Center, FractionallySizedBox, Container } from '@moonmoonbrothers/flutterjs'\n\n\n` +
			BasicWidget,
		widget: Center({
			child: FractionallySizedBox({
				child: Container({
					color: 'orange'
				})
			})
		})
	}
};

const WhitespaceCode = dedent`
	Align({
		child: Container({
			width: 200,
			height: 200,
			color: 'orange'
		})
	})
`;

export const Whitespace: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		code:
			dedent`import { Container, Row, FractionallySizedBox, Flexible } from '@moonmoonbrothers/flutterjs'\n\n\n` +
			WhitespaceCode,
		widget: Center({
			child: Row({
				children: [
					Container({
						width: 50,
						height: 50,
						color: 'green'
					}),
					Flexible({
						child: FractionallySizedBox({
							widthFactor: 0.1
						})
					}),
					Container({
						width: 100,
						height: 100,
						color: 'red'
					})
				]
			})
		})
	}
};
