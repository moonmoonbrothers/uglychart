import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import { dedent } from 'ts-dedent';
import { Container } from '@moonmoonbrothers/diagram';

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

export const Diagram: Story = {
	args: {
		widget: Container({
			width: 200,
			height: 200,
			color: 'red'
		})
	}
};
