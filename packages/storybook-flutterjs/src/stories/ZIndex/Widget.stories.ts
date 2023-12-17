import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import * as Stories from './example';

const meta = {
	title: 'Widget/ZIndex',
	component: Widget,
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px'
	}
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: Stories.Basic
};

export const ZIndexLocalContext: Story = {
	name: 'ZIndex has local context',
	args: Stories.ZIndexLocalContext
};
