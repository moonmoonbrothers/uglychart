import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import { Container, Path, ClipPath, Rect, Center } from '@moonmoonbrothers/flutterjs';

const meta = {
	title: 'Widget/ClipPath',
	component: Widget,
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
