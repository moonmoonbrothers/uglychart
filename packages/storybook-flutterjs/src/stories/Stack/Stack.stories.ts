import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import { Container, Alignment, Stack, Positioned } from '@moonmoonbrothers/flutterjs';

const meta = {
	title: 'Widget/Stack',
	component: Widget,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
	tags: ['autodocs'],
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/7.0/svelte/configure/story-layout
		layout: 'fullscreen'
	}
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Case1: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: Container({
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
		// description: `
		//   Stack try to fit maximum child size
		// `
	}
};

export const Case2: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: Container({
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
		// description: `
		//   Positioned widget in Stack can decide to its own offset with props: top, left, right, bottom,
		//   here is red one with bttom: 0, right: 0
		// `
	}
};
