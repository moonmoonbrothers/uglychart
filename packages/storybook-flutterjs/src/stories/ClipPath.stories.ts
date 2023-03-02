import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '@moonmoonbrothers/flutterjs-svelte';
import { Container, Path, ClipPath, Rect, Center } from '@moonmoonbrothers/flutterjs';

const meta = {
	title: 'Widget/ClipPath',
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

export const Basic: Story = {
	args: {
		ssrSize: { width: 400, height: 400 },
		width: '400px',
		height: '400px',
		widget: ClipPath({
			clipper: (size) =>
				new Path()
					.moveTo({ x: 0, y: 0 })
					.lineTo({ x: 0, y: size.height })
					.lineTo({ x: size.width, y: size.height })
					.close(),
			child: Container({
				color: 'black'
			})
		})
	}
};
export const RectClip: Story = {
	args: {
		ssrSize: { width: 400, height: 400 },
		width: '400px',
		height: '400px',
		widget: ClipPath({
			clipper: (size) =>
				new Path()
					.addRect(
						Rect.fromCenter({
							center: { x: size.width / 2, y: size.height / 2 },
							width: size.width / 2,
							height: size.height / 2
						})
					)
					.addRect(
						Rect.fromCenter({
							center: { x: (size.width * 7) / 8, y: size.height / 8 },
							width: size.width / 4,
							height: size.height / 4
						})
					)
					.addRect(
						Rect.fromCenter({
							center: { x: size.width / 8, y: size.height / 8 },
							width: size.width / 4,
							height: size.height / 4
						})
					)
					.addRect(
						Rect.fromCenter({
							center: { x: size.width / 8, y: (size.height * 7) / 8 },
							width: size.width / 4,
							height: size.height / 4
						})
					)
					.addRect(
						Rect.fromCenter({
							center: { x: (size.width * 7) / 8, y: (size.height * 7) / 8 },
							width: size.width / 4,
							height: size.height / 4
						})
					),
			child: Container({
				color: 'black'
			})
		})
	}
};

export const RectOval: Story = {
	args: {
		ssrSize: { width: 400, height: 400 },
		width: '400px',
		height: '400px',
		widget: ClipPath({
			clipper: (size) =>
				new Path().addOval(
					Rect.fromCenter({
						center: { x: size.width / 2, y: size.height / 2 },
						width: size.width,
						height: size.height
					})
				),
			child: Container({
				color: 'black'
			})
		})
	}
};
