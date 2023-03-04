import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '@moonmoonbrothers/flutterjs-svelte';
import { Container, Rect, ClipOval, Column, Row, Flexible } from '@moonmoonbrothers/flutterjs';

const meta = {
	title: 'Widget/ClipOval',
	component: Widget,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/7.0/svelte/configure/story-layout
		layout: 'fullscreen'
	}
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		ssrSize: { width: 400, height: 400 },
		width: '400px',
		height: '400px',
		widget: ClipOval({
			clipper: (size) =>
				Rect.fromCenter({
					center: { x: size.width / 2, y: size.height / 2 },
					width: size.width / 2,
					height: size.height / 2
				}),
			child: Column({
				children: [
					Flexible({
						child: Row({
							children: [
								Flexible({
									child: Container({
										color: 'blue'
									})
								}),
								Flexible({
									child: Container({
										color: 'red'
									})
								})
							]
						})
					}),
					Flexible({
						child: Row({
							children: [
								Flexible({
									child: Container({
										color: 'green'
									})
								}),
								Flexible({
									child: Container({
										color: 'purple'
									})
								})
							]
						})
					})
				]
			})
		})
	}
};
