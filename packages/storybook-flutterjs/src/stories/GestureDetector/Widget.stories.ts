import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import {
	Alignment,
	Container,
	GestureDetector,
	Text,
	TextStyle,
	ComponentWidget
} from '@moonmoonbrothers/flutterjs';
import { dedent } from 'ts-dedent';
import { BasicStory, ColorChangeStory, SizeChangeStory } from './examples';

const meta = {
	title: 'Widget/GestureDetector',
	component: Widget,
	parameters: {
		layout: 'fullscreen'
	},
	args: {
		width: '400px',
		height: '400px',
		ssrSize: { width: 400, height: 400 }
	}
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: BasicStory
};

export const ColorChange: Story = {
	args: ColorChangeStory
};

export const SizeChange: Story = {
	args: SizeChangeStory
};
