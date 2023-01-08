import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '@moonmoonbrothers/like-flutter-svelte';
import { Column, Container, Flexible } from '@moonmoonbrothers/like-flutter';

const meta = {
	title: 'Widget/Column',
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

// description: `Column can have muliple widgets,
// Basically, its height would be stretched as possible.
// its width would be shrinked to fit child max width
// `,
export const Case1: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: Container({
			color: 'lightblue',
			child: Column({
				children: [
					Container({
						width: 50,
						height: 50,
						color: 'red'
					}),
					Container({
						width: 100,
						height: 50,
						color: 'blue'
					}),
					Container({
						width: 50,
						height: 50,
						color: 'green'
					})
				]
			})
		})
	}
};

// description: `Column can have mainAxisAlignment: 'end'`,
export const Case2: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: Container({
			color: 'lightblue',
			child: Column({
				mainAxisAlignment: 'end',
				children: [
					Container({
						width: 50,
						height: 50,
						color: 'red'
					}),
					Container({
						width: 50,
						height: 50,
						color: 'blue'
					}),
					Container({
						width: 50,
						height: 50,
						color: 'green'
					})
				]
			})
		})
	}
};

// description: `Column can have mainAxisAlignment: 'spaceBetween'`,
export const Case3: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: Container({
			color: 'lightblue',
			child: Column({
				mainAxisAlignment: 'spaceBetween',
				children: [
					Container({
						width: 50,
						height: 50,
						color: 'red'
					}),
					Container({
						width: 50,
						height: 50,
						color: 'blue'
					}),
					Container({
						width: 50,
						height: 50,
						color: 'green'
					})
				]
			})
		})
	}
};

export const Case4: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: Container({
			color: 'lightblue',
			child: Column({
				mainAxisAlignment: 'spaceEvenly',
				children: [
					Container({
						width: 50,
						height: 50,
						color: 'red'
					}),
					Container({
						width: 50,
						height: 50,
						color: 'blue'
					}),
					Container({
						width: 50,
						height: 50,
						color: 'green'
					})
				]
			})
		})
		// description: `Column can have mainAxisAlignment: 'spaceEvenly'`
	}
};

export const Case5: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: Container({
			color: 'lightblue',
			child: Column({
				mainAxisAlignment: 'spaceAround',
				children: [
					Container({
						width: 50,
						height: 50,
						color: 'red'
					}),
					Container({
						width: 50,
						height: 50,
						color: 'blue'
					}),
					Container({
						width: 50,
						height: 50,
						color: 'green'
					})
				]
			})
		})
		// description: `Column can have mainAxisAlignment: 'spaceAround'`
	}
};

export const Case6: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: Container({
			color: 'lightblue',
			child: Column({
				mainAxisAlignment: 'spaceBetween',
				crossAxisAlignment: 'center',
				children: [
					Container({
						width: 50,
						height: 50,
						color: 'red'
					}),
					Container({
						width: 100,
						height: 50,
						color: 'blue'
					}),
					Container({
						width: 50,
						height: 50,
						color: 'green'
					})
				]
			})
		})
		// description: `Column can have crossAlignment: 'center(default)'`
	}
};

export const Case7: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: Container({
			color: 'lightblue',
			child: Column({
				mainAxisAlignment: 'spaceBetween',
				crossAxisAlignment: 'start',
				children: [
					Container({
						width: 50,
						height: 50,
						color: 'red'
					}),
					Container({
						width: 100,
						height: 50,
						color: 'blue'
					}),
					Container({
						width: 50,
						height: 50,
						color: 'green'
					})
				]
			})
		})
		// description: `Column can have crossAlignment: 'start'`
	}
};

export const Case8: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: Container({
			color: 'lightblue',
			child: Column({
				mainAxisAlignment: 'spaceBetween',
				crossAxisAlignment: 'end',
				children: [
					Container({
						width: 50,
						height: 50,
						color: 'red'
					}),
					Container({
						width: 100,
						height: 50,
						color: 'blue'
					}),
					Container({
						width: 50,
						height: 50,
						color: 'green'
					})
				]
			})
		})
		// description: `Column can have crossAlignment: 'end'`
	}
};
export const Case9: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: Container({
			color: 'lightblue',
			child: Column({
				mainAxisAlignment: 'spaceBetween',
				crossAxisAlignment: 'stretch',
				children: [
					Container({
						width: 50,
						height: 50,
						color: 'red'
					}),
					Container({
						width: 100,
						height: 50,
						color: 'blue'
					}),
					Container({
						width: 50,
						height: 50,
						color: 'green'
					})
				]
			})
		})
		// description: `Column can have crossAlignment: 'stretch'`
	}
};
export const Case10: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		widget: Container({
			color: 'lightblue',
			child: Column({
				children: [
					Flexible({
						child: Container({
							width: 50,
							height: 50,
							color: 'red'
						})
					}),
					Flexible({
						child: Container({
							width: 50,
							height: 50,
							color: 'blue'
						})
					})
				]
			})
		})
		// description: `Column can have Flexible widget`
	}
};
