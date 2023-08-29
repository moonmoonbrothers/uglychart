import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import * as StoryArgs from './example';

const meta = {
	title: 'Widget/LineChart/Cases',
	component: Widget,
	args: {
		ssrSize: { width: 600, height: 380},
		width: '600px',
		height: '380px'
	}
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: StoryArgs.Basic
};

export const Spline: Story = {
	args: StoryArgs.Spline
};
