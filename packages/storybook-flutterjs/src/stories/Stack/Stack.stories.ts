/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import { Container, Alignment, Stack, Positioned } from '@moonmoonbrothers/flutterjs';
import { dedent } from 'ts-dedent';
const ImportWidgetCode = dedent`import { Container, Alignment, Stack, Positioned } from '@moonmoonbrothers/flutterjs';
\n\n`;

const meta = {
	title: 'Widget/Stack',
	component: Widget,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: dedent`
					This is Stack widget. 
					## Hi
				`
			}
		}
	}
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

const Case1Code = dedent`
	Container({
		color: 'lightgrey',
		alignment: Alignment.center,
		child: Stack({
			children: [
				Container({
					width: 100,
					height: 100,
					color: 'green'
				}),
				Container({
					width: 50,
					height: 50,
					color: 'red'
				})
			]
		})
	})
`;
export const Case1: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: eval(Case1Code),
		code: ImportWidgetCode + Case1Code
	}
};

const Case2Code = dedent`
	Container({
		color: 'lightgrey',
		width: Infinity,
		height: Infinity,
		alignment: Alignment.center,
		child: Stack({
			children: [
				Container({
					width: 100,
					height: 100,
					color: 'green'
				}),
				Positioned({
					bottom: 0,
					right: 0,
					child: Container({
						width: 50,
						height: 50,
						color: 'red'
					})
				})
			]
		})
	})
`;

export const Case2: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: eval(Case2Code),
		code: ImportWidgetCode + Case2Code
	}
};
