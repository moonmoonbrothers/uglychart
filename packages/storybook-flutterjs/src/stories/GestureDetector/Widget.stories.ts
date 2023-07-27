import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import {
	Alignment,
	Container,
	GestureDetector,
	Text,
	TextStyle,
	ComponentWidget,
	BuildContext
} from '@moonmoonbrothers/flutterjs';
import { dedent } from 'ts-dedent';

const meta = {
	title: 'Widget/GestureDetector',
	component: Widget,
	parameters: {
		layout: 'fullscreen'
	}
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		width: '400px',
		height: '400px',
		ssrSize: { width: 400, height: 400 },
		widget: Container({
			alignment: Alignment.center,
			color: 'lightgreen',
			child: GestureDetector({
				onClick() {
					alert('clicked!!');
				},
				child: Container({
					width: 200,
					height: 200,
					color: 'black',
					alignment: Alignment.center,
					child: Text('click here!!', {
						style: new TextStyle({ fontSize: 20, fontWeight: 'bold', color: 'white' })
					})
				})
			})
		}),
		code: dedent`
		import { Container, GestureDetector, Alignment, TextStyle, Text } from '@moonmoonbrothers/flutterjs';
			
		Container({
			alignment: Alignment.center,
			color: 'lightgreen',
			child: GestureDetector({
				onClick() {
					console.log('clicked!!');
				},
				child: Container({
					width: 200,
					height: 200,
					color: 'black',
					child: Text('click here!!', {
						style: new TextStyle({ fontSize: 20, fontWeight: 'bold', color: 'white' })
					})
				})
			})
		})`
	}
};

class CustomWidget extends ComponentWidget {
	colors: string[];
	index = 0;
	constructor({ colors, key }: { colors: string[]; key?: string }) {
		super(key);
		this.colors = colors;
	}
	build(context: BuildContext) {
		const handleClick = () => {
			this.index = this.index + 1 + this.colors.length;
		};
		return GestureDetector({
			onClick() {
				handleClick();
			},
			child: Container({
				width: 200,
				height: 200,
				color: this.colors[this.index],
				alignment: Alignment.center,
				child: Text('click here!!', {
					style: new TextStyle({ fontSize: 20, fontWeight: 'bold', color: 'white' })
				})
			})
		});
	}
}

export const ColorChange: Story = {
	args: {
		width: '400px',
		height: '400px',
		ssrSize: { width: 400, height: 400 },
		widget: Container({
			alignment: Alignment.center,
			color: 'lightgreen',
			child: new CustomWidget({
				colors: ['black', 'red', 'green']
			})
		}),
		code: dedent`
		`
	}
};
