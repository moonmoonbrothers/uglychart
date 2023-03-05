/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import { Container, Text, Alignment, EdgeInsets } from '@moonmoonbrothers/flutterjs';
import { dedent } from 'ts-dedent';
const ImportWidgetCode = dedent`import { Container, Text, Alignment, EdgeInsets } from '@moonmoonbrothers/flutterjs';
\n\n`;

const meta = {
	title: 'Widget/Container',
	component: Widget,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: dedent`
					This is Container widget. 
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
		color: 'lightblue'
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
		color: 'lightblue',
		child: Text('text', { style: { fontSize: '30px' } })
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
const Case3Code = dedent`
	Container({
		color: 'lightblue',
		width: 300,
		height: 300,
		padding: EdgeInsets.all(10),
		child: Container({
			color: 'green',
			child: Text('child in blue container')
		})
	})
`;
export const Case3: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: eval(Case3Code),
		code: ImportWidgetCode + Case3Code
	}
};
const Case4Code = dedent`
	Container({
		color: 'lightblue',
		width: 300,
		height: 300,
		padding: EdgeInsets.all(10),
		alignment: Alignment.center,
		child: Container({
			color: 'green',
			child: Text('child')
		})
	})
`;
export const Case4: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: eval(Case4Code),
		code: ImportWidgetCode + Case4Code
	}
};
