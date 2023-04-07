import type { Meta, StoryObj } from '@storybook/svelte';
import Widget from '../../Widget.svelte';
import { dedent } from 'ts-dedent';
import {
	Container,
	Flex,
	Axis,
	VerticalDirection,
	MainAxisSize,
	MainAxisAlignment,
	Text,
	Alignment,
	Flexible,
	TextStyle
} from '@moonmoonbrothers/flutterjs';

const meta = {
	title: 'Widget/Flex',
	component: Widget
} satisfies Meta<Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

const BasicWidget = dedent`
	Center({
		child: FractionallySizedBox({
			widthFactor: 0.5,
			heightFactor: 0.5,
			child: Container({
				color: 'orange'
			})
		})
	})
`;

export const Row: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		code:
			dedent`import { Flex, Container, Axis } from '@moonmoonbrothers/flutterjs'\n\n\n` +
			BasicWidget,
		widget: Container({
			color: 'lightblue',
			child: Flex({
				direction: Axis.horizontal,
				children: [
					Container({
						width: 50,
						height: 50,
						color: 'red'
					}),
					Container({
						width: 50,
						height: 100,
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

export const Column: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		code:
			dedent`import { Flex, Container, Axis } from '@moonmoonbrothers/flutterjs'\n\n\n` +
			BasicWidget,
		widget: Container({
			color: 'lightblue',
			child: Flex({
				direction: Axis.vertical,
				children: [
					Container({
						width: 50,
						height: 50,
						color: 'red'
					}),
					Container({
						width: 50,
						height: 100,
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

const MainAxisSize_minCode = dedent`
		Container({
			color: 'lightblue',
			child: Flex({
				direction: Axis.horizontal,
				mainAxisSize: MainAxisSize.min,
				children: [
					Container({
						width: 50,
						height: 50,
						color: 'red'
					}),
					Container({
						width: 50,
						height: 50,
						color: 'green'
					})
				]
			})
		})
`;

export const MainAxisSize_min: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		code:
			dedent`import { Flex, Container, Axis } from '@moonmoonbrothers/flutterjs'\n\n\n` +
			MainAxisSize_minCode,
		widget: Container({
			color: 'lightblue',
			child: 
      Flex({
				direction: Axis.horizontal,
				mainAxisSize: MainAxisSize.min,
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
							color: 'green'
						})
					}),
				]
			})
		})
	}
};

const VerticalDirection_upCode = dedent`
		Container({
			color: 'lightblue',
			child: Flex({
				direction: Axis.horizontal,
				verticalDirection: VerticalDirection.up,
				children: [
					Container({
						width: 50,
						height: 50,
						color: 'red',
						alignment: Alignment.center,
						child: Text('1', { style: { fontColor: 'white', fontSize: '30px' } })
					}),
					Container({
						width: 50,
						height: 50,
						color: 'green',
						alignment: Alignment.center,
						child: Text('2', { style: { fontColor: 'white', fontSize: '30px' } })
					})
				]
			})
		})
`;

export const VerticalDirection_up: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		code:
			dedent`import { Flex, Container, Axis, VerticalDireciton, Text, Alignment } from '@moonmoonbrothers/flutterjs'\n\n\n` +
			VerticalDirection_upCode,
		widget: Container({
			color: 'lightblue',
			child: Flex({
				direction: Axis.horizontal,
				verticalDirection: VerticalDirection.up,
				children: [
					Container({
						width: 50,
						height: 50,
						color: 'red',
						alignment: Alignment.center,
						child: Text('1', {style: new TextStyle({color: 'white', fontSize: 30})} )
					}),
					Container({
						width: 50,
						height: 50,
						color: 'green',
						alignment: Alignment.center,
						child: Text('2', {style: new TextStyle({color: 'white', fontSize: 30})} )
					})
				]
			})
		})
	}
};

const MainAxisAlignment_centerCode = dedent`
		Container({
			color: 'lightblue',
			child: Flex({
				direction: Axis.horizontal,
				mainAxisAlignment: MainAxisAlignment.center,
				children: [
					Container({
						width: 50,
						height: 50,
						color: 'red'
					}),
					Container({
						width: 50,
						height: 50,
						color: 'green'
					})
				]
			})
		})
`;

export const MainAxisAlignment_center: Story = {
	args: {
		ssrSize: { width: 600, height: 300 },
		width: '600px',
		height: '300px',
		code:
			dedent`import { Flex, Container, Axis } from '@moonmoonbrothers/flutterjs'\n\n\n` +
			MainAxisAlignment_centerCode,
		widget: Container({
			color: 'lightblue',
			child: Flex({
				direction: Axis.horizontal,
				mainAxisAlignment: MainAxisAlignment.center,
				children: [
					Container({
						width: 50,
						height: 50,
						color: 'red'
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
