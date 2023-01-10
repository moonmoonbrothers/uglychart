import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '@moonmoonbrothers/flutterjs-svelte';
import { Container } from '@moonmoonbrothers/flutterjs';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/svelte/writing-stories/introduction
const meta = {
	title: 'Example/Widget',
	component: Widget,
	tags: ['autodocs']
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/svelte/writing-stories/args
export const Primary: Story = {
	args: {
		srrSize: {
			width: 600,
			height: 300
		},
		width: '600px',
		height: '300px',
		widget: Container({ color: 'red' })
	}
};
