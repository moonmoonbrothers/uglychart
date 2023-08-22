import type { Meta, StoryObj } from '@storybook/svelte';
import { BasicStory } from './example';
import Widget from '../Widget.svelte';

const meta = {
	title: 'Diagram',
	component: Widget,
	args: {
		ssrSize: { width: 2000, height: 2000 },
		width: '2000px',
		height: '2000px'
	}
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: BasicStory
};
