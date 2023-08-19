import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import { BasicStory } from './example';

const meta = {
	title: 'Diagram',
	component: Widget,
	args: {
		ssrSize: { width: 800, height: 480 },
		width: '800px',
		height: '480px'
	}
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: BasicStory
};
